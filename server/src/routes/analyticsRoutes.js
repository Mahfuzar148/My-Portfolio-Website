import { Router } from "express";

const router = Router();

const profiles = {
  github: {
    platform: "GitHub",
    username: "Mahfuzar148",
    href: "https://github.com/Mahfuzar148",
    description: "Repository activity, followers, account age, and language share.",
  },
  codeforces: {
    platform: "Codeforces",
    username: "mahfuzar148",
    href: "https://codeforces.com/profile/mahfuzar148",
    description: "Contest rating, max rating, and contest count.",
  },
  leetcode: {
    platform: "LeetCode",
    username: "Mahfuzar148",
    href: "https://leetcode.com/u/Mahfuzar148/",
    description: "Solved problems, acceptance rate, and consistency.",
  },
  codechef: {
    platform: "CodeChef",
    username: "mahfuzar148",
    href: "https://www.codechef.com/users/mahfuzar148",
    description: "Rating, solved problems, and contest activity.",
  },
};

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(Number(value || 0));
}

function formatPercent(value) {
  const numberValue = Number(value || 0);
  return `${numberValue.toFixed(2).replace(/\.00$/, "")}%`;
}

function collapseHtml(html) {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

async function fetchGraphQL(url, query, variables) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0",
      Referer: "https://leetcode.com",
      Origin: "https://leetcode.com",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "text/html,application/xhtml+xml",
      "User-Agent": "Mozilla/5.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.text();
}

function fallbackProfile(profile, message) {
  return {
    ...profile,
    status: "fallback",
    note: message,
    metrics: [
      { label: "Status", value: "Unavailable" },
      { label: "Source", value: "Public page" },
      { label: "Update", value: "Retry" },
    ],
  };
}

async function fetchGitHubLanguageShare() {
  const allLanguages = [];
  let repoCount = 0;

  for (let page = 1; page <= 4; page += 1) {
    const html = await fetchText(`https://github.com/Mahfuzar148?tab=repositories&page=${page}`);
    const repoCountOnPage = (html.match(/itemprop="name codeRepository"/g) || []).length;

    if (!repoCountOnPage) {
      break;
    }

    repoCount += repoCountOnPage;

    for (const match of html.matchAll(/itemprop="programmingLanguage">([^<]+)</g)) {
      allLanguages.push(match[1].trim());
    }
  }

  const counts = new Map();
  let classifiedCount = 0;

  for (const language of allLanguages) {
    classifiedCount += 1;
    counts.set(language, (counts.get(language) || 0) + 1);
  }

  const languages = Array.from(counts.entries())
    .sort((first, second) => second[1] - first[1])
    .slice(0, 6)
    .map(([label, count]) => ({
      label,
      count,
      percent: classifiedCount ? Number(((count / classifiedCount) * 100).toFixed(1)) : 0,
    }));

  return {
    repoCount,
    classifiedCount,
    languages,
  };
}

function baseLimits(values) {
  return values.map((item) => ({ label: item }));
}

function countActiveDays(submissionCalendar) {
  return Object.values(submissionCalendar || {}).filter((value) => Number(value) > 0).length;
}

function buildLeetCodeProfileFromGraphQL(data) {
  const matchedUser = data?.data?.matchedUser;
  const submissions = matchedUser?.submitStats?.acSubmissionNum || [];
  const byDifficulty = new Map(submissions.map((entry) => [entry.difficulty, Number(entry.count || 0)]));

  if (!matchedUser) {
    return null;
  }

  return {
    ...profiles.leetcode,
    status: "live",
    note: "Updated from LeetCode GraphQL, which is the most direct public source.",
    limits: baseLimits([
      "Problem counts are public through GraphQL.",
      "Topic-wise solved breakdown is not exposed by this source.",
    ]),
    breakdown: [
      { label: "Easy", value: formatNumber(byDifficulty.get("Easy")) },
      { label: "Medium", value: formatNumber(byDifficulty.get("Medium")) },
      { label: "Hard", value: formatNumber(byDifficulty.get("Hard")) },
    ],
    metrics: [
      { label: "Solved", value: formatNumber(byDifficulty.get("All")) },
      { label: "Acceptance", value: "—" },
      { label: "Active days", value: "—" },
      { label: "Rank", value: formatNumber(matchedUser?.profile?.ranking) },
    ],
  };
}

function buildLeetCodeProfileFromStatsApi(data) {
  if (!data || data.status !== "success") {
    return null;
  }

  const submissionCalendar = data?.submissionCalendar && typeof data.submissionCalendar === "object" ? data.submissionCalendar : {};

  return {
    ...profiles.leetcode,
    status: "live",
    note: "Updated from LeetCode Stats API, which includes acceptance and activity data.",
    limits: baseLimits([
      "Easy / medium / hard solved split is public.",
      "Topic-wise solved breakdown is not exposed by this API.",
    ]),
    breakdown: [
      { label: "Easy", value: formatNumber(data?.easySolved) },
      { label: "Medium", value: formatNumber(data?.mediumSolved) },
      { label: "Hard", value: formatNumber(data?.hardSolved) },
    ],
    metrics: [
      { label: "Solved", value: formatNumber(data?.totalSolved) },
      { label: "Acceptance", value: data?.acceptanceRate != null ? formatPercent(data.acceptanceRate) : "—" },
      { label: "Active days", value: formatNumber(countActiveDays(submissionCalendar)) },
      { label: "Rank", value: formatNumber(data?.ranking) },
    ],
  };
}

function getLeetCodeFromStatsApi(data) {
  if (!data || data.status !== "success") {
    return null;
  }

  const submissionCalendar = data?.submissionCalendar && typeof data.submissionCalendar === "object" ? data.submissionCalendar : {};

  return {
    ...profiles.leetcode,
    status: "live",
    note: "Updated from LeetCode Stats API, which is more stable than the previous source.",
    limits: baseLimits([
      "Easy / medium / hard solved split is public.",
      "Topic-wise solved breakdown is not exposed by this API.",
    ]),
    breakdown: [
      { label: "Easy", value: formatNumber(data?.easySolved) },
      { label: "Medium", value: formatNumber(data?.mediumSolved) },
      { label: "Hard", value: formatNumber(data?.hardSolved) },
    ],
    metrics: [
      { label: "Solved", value: formatNumber(data?.totalSolved) },
      { label: "Acceptance", value: data?.acceptanceRate != null ? formatPercent(data.acceptanceRate) : "—" },
      { label: "Active days", value: formatNumber(countActiveDays(submissionCalendar)) },
      { label: "Rank", value: formatNumber(data?.ranking) },
    ],
  };
}

async function fetchLeetCodeProfileFromSources() {
  const sources = [
    "https://leetcode-stats-api.herokuapp.com/Mahfuzar148",
    "https://leetcode.com/graphql",
    "https://leetcode-api-faisalshohag.vercel.app/Mahfuzar148",
  ];

  let lastError = null;

  for (const source of sources) {
    try {
      const data = source.includes("graphql")
        ? await fetchGraphQL(
            source,
            `query userProfile($username: String!) {
              matchedUser(username: $username) {
                profile {
                  ranking
                }
                submitStats {
                  acSubmissionNum {
                    difficulty
                    count
                  }
                }
              }
            }`,
            { username: profiles.leetcode.username },
          )
        : await fetchJson(source);

      if (source.includes("leetcode-stats-api")) {
        const profile = buildLeetCodeProfileFromStatsApi(data);

        if (profile) {
          return profile;
        }
      }

      if (source.includes("graphql")) {
        const profile = buildLeetCodeProfileFromGraphQL(data);

        if (profile) {
          return profile;
        }
      }

      const profile = buildLeetCodeProfileFromStatsApi(data);

      if (profile) {
        return profile;
      }
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Unable to load LeetCode data.");
}

async function fetchGitHubProfile() {
  try {
    const [profileHtml, languages] = await Promise.all([
      fetchText("https://github.com/Mahfuzar148"),
      fetchGitHubLanguageShare(),
    ]);

    const collapsedProfile = collapseHtml(profileHtml);
    const followerMatch = collapsedProfile.match(/([\d,]+)\s+followers\s+·\s+([\d,]+)\s+following/i);

    return {
      ...profiles.github,
      status: "live",
      note: `Updated from GitHub public pages. Last synced ${new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })}.`,
      languages: languages.languages,
      limits: baseLimits([
        "Public repo language share is derived from repository listings.",
        "Exact code-volume percentages need private analysis or a third-party stats service.",
      ]),
      metrics: [
        { label: "Public repos", value: formatNumber(languages.repoCount) },
        { label: "Followers", value: formatNumber(followerMatch?.[1]) },
        { label: "Following", value: formatNumber(followerMatch?.[2]) },
        { label: "Languages", value: formatNumber(languages.languages.length) },
        { label: "Top language", value: languages.languages[0]?.label || "—" },
      ],
    };
  } catch (_error) {
    return fallbackProfile(profiles.github, "GitHub live stats are temporarily unavailable.");
  }
}

async function fetchCodeforcesProfile() {
  try {
    const [infoResponse, ratingResponse] = await Promise.all([
      fetchJson("https://codeforces.com/api/user.info?handles=mahfuzar148"),
      fetchJson("https://codeforces.com/api/user.rating?handle=mahfuzar148"),
    ]);

    const info = infoResponse?.result?.[0] || {};
    const history = Array.isArray(ratingResponse?.result) ? ratingResponse.result : [];
    const recentRatings = history.slice(-8).map((entry) => ({
      contest: entry.contestName,
      rating: entry.newRating,
      change: entry.newRating - entry.oldRating,
      time: new Date(entry.ratingUpdateTimeSeconds * 1000).toISOString(),
    }));

    return {
      ...profiles.codeforces,
      status: "live",
      note: `Updated from Codeforces API. Rank ${info.rank || "unknown"} with ${history.length} rated contests.`,
      limits: baseLimits([
        "Exact solved count is not exposed by the official public API.",
        "Topic-wise breakdown is not publicly available.",
      ]),
      recentRatings,
      metrics: [
        { label: "Rating", value: formatNumber(info.rating) },
        { label: "Max rating", value: formatNumber(info.maxRating) },
        { label: "Rated contests", value: formatNumber(history.length) },
      ],
    };
  } catch (_error) {
    return fallbackProfile(profiles.codeforces, "Codeforces live stats are temporarily unavailable.");
  }
}

async function fetchLeetCodeProfile() {
  try {
    return await fetchLeetCodeProfileFromSources();
  } catch (_error) {
    return fallbackProfile(profiles.leetcode, "LeetCode live stats are temporarily unavailable.");
  }
}

async function fetchCodeChefProfile() {
  try {
    const rawHtml = await fetchText("https://www.codechef.com/users/mahfuzar148");
    const text = collapseHtml(rawHtml);

    const ratingMatch = text.match(/(\d+)\s*\(\s*([+-]?\d+)\s*\)\s*Rating/i) || text.match(/(\d+)\s*Rating/i);
    const highestRatingMatch = text.match(/Highest Rating\s*(\d+)/i);
    const contestsMatch = text.match(/No\. of Contests Participated:\s*(\d+)/i);
    const solvedMatch = text.match(/Total Problems Solved:\s*(\d+)/i);
    const rankMatch = text.match(/Global Rank:\s*([\d,]+)/i);
    const starMatch = text.match(/(\d)★/i);

    return {
      ...profiles.codechef,
      status: "live",
      note: `Updated from public CodeChef profile. Global rank ${rankMatch?.[1] || "unknown"}.`,
      limits: baseLimits([
        "Total solved count is public.",
        "Difficulty-wise solved breakdown is not publicly exposed.",
      ]),
      metrics: [
        { label: "Rating", value: ratingMatch?.[1] ? formatNumber(ratingMatch[1]) : "0" },
        { label: "Highest rating", value: highestRatingMatch?.[1] ? formatNumber(highestRatingMatch[1]) : "0" },
        { label: "Solved", value: solvedMatch?.[1] ? formatNumber(solvedMatch[1]) : "0" },
        { label: "Contests", value: contestsMatch?.[1] ? formatNumber(contestsMatch[1]) : "0" },
        { label: "Star", value: starMatch?.[1] ? `${starMatch[1]}★` : "0★" },
      ],
    };
  } catch (_error) {
    return fallbackProfile(profiles.codechef, "CodeChef live stats are temporarily unavailable.");
  }
}

router.get("/", async (_req, res) => {
  try {
    const [github, codeforces, leetcode, codechef] = await Promise.all([
      fetchGitHubProfile(),
      fetchCodeforcesProfile(),
      fetchLeetCodeProfile(),
      fetchCodeChefProfile(),
    ]);

    const liveCount = [github, codeforces, leetcode, codechef].filter((profile) => profile.status === "live").length;

    return res.json({
      ok: true,
      status: liveCount === 4 ? "live" : liveCount > 0 ? "partial" : "fallback",
      updatedAt: new Date().toISOString(),
      message:
        liveCount === 4
          ? "Live analytics loaded from GitHub, Codeforces, LeetCode, and CodeChef."
          : "Some analytics sources were unavailable, so fallback values are shown where needed.",
      profiles: {
        GitHub: github,
        Codeforces: codeforces,
        LeetCode: leetcode,
        CodeChef: codechef,
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      status: "error",
      message: error?.message || "Unable to load live analytics right now.",
    });
  }
});

export default router;
