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
  const allRepos = [];

  for (let page = 1; page <= 4; page += 1) {
    const response = await fetch(`https://api.github.com/users/Mahfuzar148/repos?per_page=100&page=${page}&sort=updated&direction=desc`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repos = await response.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      break;
    }

    allRepos.push(...repos);

    if (repos.length < 100) {
      break;
    }
  }

  const counts = new Map();
  let classifiedCount = 0;

  for (const repo of allRepos) {
    if (!repo?.language) {
      continue;
    }

    classifiedCount += 1;
    counts.set(repo.language, (counts.get(repo.language) || 0) + 1);
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
    repoCount: allRepos.length,
    classifiedCount,
    languages,
  };
}

function baseLimits(values) {
  return values.map((item) => ({ label: item }));
}

async function fetchGitHubProfile() {
  try {
    const [data, languages] = await Promise.all([
      fetchJson("https://api.github.com/users/Mahfuzar148"),
      fetchGitHubLanguageShare(),
    ]);

    return {
      ...profiles.github,
      status: "live",
      note: `Updated from GitHub API. Last synced ${new Date(data.updated_at || Date.now()).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })}.`,
      languages: languages.languages,
      limits: baseLimits([
        "Repo-share percentages are public.",
        "Exact code-volume percentages need private analysis or a third-party stats service.",
      ]),
      metrics: [
        { label: "Public repos", value: formatNumber(data.public_repos) },
        { label: "Followers", value: formatNumber(data.followers) },
        { label: "Following", value: formatNumber(data.following) },
        { label: "Languages", value: formatNumber(languages.languages.length) },
        { label: "Joined", value: String(new Date(data.created_at).getFullYear()) },
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
    const rawHtml = await fetchText("https://leetcode.com/u/Mahfuzar148/");
    const text = collapseHtml(rawHtml);

    const solvedMatch = text.match(/(\d+)\/\d+\s+Solved/i);
    const acceptanceMatch = text.match(/([\d.]+)%\s+Acceptance/i);
    const rankMatch = text.match(/Rank\s*([\d,]+)/i);
    const activeDaysMatch = text.match(/Total active days:\s*(\d+)/i);
    const streakMatch = text.match(/Max streak:\s*(\d+)/i);
    const easyMatch = text.match(/Easy\s+(\d+)\/\d+/i);
    const mediumMatch = text.match(/Med\.?\s+(\d+)\/\d+/i);
    const hardMatch = text.match(/Hard\s+(\d+)\/\d+/i);

    return {
      ...profiles.leetcode,
      status: "live",
      note: `Updated from public LeetCode profile. Rank ${rankMatch?.[1] || "unknown"}.`,
      limits: baseLimits([
        "Easy / medium / hard solved split is public.",
        "Topic-wise solved breakdown is not officially exposed.",
      ]),
      breakdown: [
        { label: "Easy", value: easyMatch?.[1] ? formatNumber(easyMatch[1]) : "0" },
        { label: "Medium", value: mediumMatch?.[1] ? formatNumber(mediumMatch[1]) : "0" },
        { label: "Hard", value: hardMatch?.[1] ? formatNumber(hardMatch[1]) : "0" },
      ],
      metrics: [
        { label: "Solved", value: solvedMatch?.[1] ? formatNumber(solvedMatch[1]) : "0" },
        { label: "Acceptance", value: acceptanceMatch?.[1] ? formatPercent(acceptanceMatch[1]) : "0%" },
        { label: "Active days", value: activeDaysMatch?.[1] ? formatNumber(activeDaysMatch[1]) : "0" },
        { label: "Max streak", value: streakMatch?.[1] ? formatNumber(streakMatch[1]) : "0" },
      ],
    };
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

function createResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify(body),
  };
}

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return createResponse(200, { ok: true });
  }

  if (event.httpMethod !== "GET") {
    return createResponse(405, {
      ok: false,
      message: "Method not allowed.",
    });
  }

  try {
    const [github, codeforces, leetcode, codechef] = await Promise.all([
      fetchGitHubProfile(),
      fetchCodeforcesProfile(),
      fetchLeetCodeProfile(),
      fetchCodeChefProfile(),
    ]);

    const liveCount = [github, codeforces, leetcode, codechef].filter((profile) => profile.status === "live").length;

    return createResponse(200, {
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
    return createResponse(500, {
      ok: false,
      status: "error",
      message: error?.message || "Unable to load live analytics right now.",
    });
  }
};
