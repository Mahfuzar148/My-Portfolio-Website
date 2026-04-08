export function ContactIcon({ type }) {
  if (type === "email") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 3.2V17h16V8.2l-8 5.2-8-5.2Zm14.1-1.2H5.9L12 11.1l6.1-4.1Z" />
      </svg>
    );
  }

  if (type === "call") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.6 10.8c1.2 2.4 3.2 4.4 5.6 5.6l1.9-1.9a1 1 0 0 1 1-.2c1.1.4 2.3.6 3.5.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4a1 1 0 0 1 1-1h3.1a1 1 0 0 1 1 1c0 1.2.2 2.4.6 3.5a1 1 0 0 1-.2 1l-1.9 2.3Z" />
      </svg>
    );
  }

  if (type === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.8.8-2.7-.2-.3A8 8 0 1 1 12 20Zm4.7-5.8c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.6.1-.7.8-.8 1-.3.1-.5 0a6.6 6.6 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.6l.4-.5c.1-.2.1-.3.2-.5.1-.1 0-.3 0-.5s-.6-1.5-.8-2.1c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4s-1.1 1-1.1 2.4 1.2 2.8 1.4 3 .8 1.2 2 1.9c1.2.8 2.1 1 3.1 1s1.5-.2 2-.6c.4-.4.8-.9.9-1.4.1-.5.1-.8 0-.8s-.2-.1-.4-.2Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm-1 14.6-3.4-3.4 1.4-1.4 2 2 5-5 1.4 1.4Z" />
    </svg>
  );
}

export function SidebarIcon({ type }) {
  if (type === "home") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 3 10v11h6v-7h6v7h6V10l-9-7Z" />
      </svg>
    );
  }

  if (type === "user") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2c-4.4 0-8 2.5-8 5.5V21h16v-1.5c0-3-3.6-5.5-8-5.5Z" />
      </svg>
    );
  }

  if (type === "skills") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16v3H4V6Zm0 5.5h16v3H4v-3ZM4 17h10v3H4v-3Z" />
      </svg>
    );
  }

  if (type === "project") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 4h16v16H4V4Zm2 2v12h12V6H6Zm1.5 2.2h9v2h-9v-2Zm0 4h9v2h-9v-2Z" />
      </svg>
    );
  }

  if (type === "timeline") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 2h2v2h8V2h2v4H6V2Zm0 6h12v12H6V8Zm2 2v8h8v-8H8Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16v14H4V5Zm2 2v10h12V7H6Zm2 2h8v2H8V9Zm0 4h5v2H8v-2Z" />
    </svg>
  );
}