/**
 * GitHub Profile Explorer
 * Queries the public GitHub REST API for user profile details and public repositories.
 */

const usernameInput = document.getElementById("usernameInput");
const searchBtn = document.getElementById("searchBtn");
const profileContainer = document.getElementById("profileContainer");
const reposContainer = document.getElementById("reposContainer");

searchBtn.addEventListener("click", handleUserSearch);

usernameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleUserSearch();
  }
});

function handleUserSearch() {
  const username = usernameInput.value.trim();
  if (!username) {
    alert("Please enter a GitHub username.");
    return;
  }
  loadGitHubProfile(username);
}

async function loadGitHubProfile(username) {
  profileContainer.innerHTML = "<p>Loading profile...</p>";
  reposContainer.innerHTML = "";

  try {
    const userResponse = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);

    if (!userResponse.ok) {
      throw new Error("GitHub user not found.");
    }

    const user = await userResponse.json();

    profileContainer.innerHTML = `
      <div class="profile">
        <img src="${user.avatar_url}" alt="${user.login} avatar">
        <div>
          <h2>${user.name || user.login}</h2>
          <p><strong>Username:</strong> @${user.login}</p>
          <p>${user.bio || "No bio provided."}</p>
          <p><strong>Followers:</strong> ${user.followers} | <strong>Following:</strong> ${user.following}</p>
          <p><strong>Public Repositories:</strong> ${user.public_repos}</p>
          <a href="${user.html_url}" target="_blank" rel="noopener noreferrer">View GitHub Profile ↗</a>
        </div>
      </div>
    `;

    const reposResponse = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated`);
    const repositories = await reposResponse.json();

    if (!Array.isArray(repositories) || repositories.length === 0) {
      reposContainer.innerHTML = "<p>No public repositories available.</p>";
      return;
    }

    const repoCardsHtml = repositories
      .map(
        (repo) => `
        <div class="repo">
          <h3><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h3>
          <p>${repo.description || "No description provided."}</p>
          <p>⭐ Stars: ${repo.stargazers_count} | 🍴 Forks: ${repo.forks_count} | 💻 Language: ${repo.language || "Not specified"}</p>
        </div>
      `
      )
      .join("");

    reposContainer.innerHTML = `<h2>Public Repositories (${repositories.length})</h2>${repoCardsHtml}`;
  } catch (error) {
    profileContainer.innerHTML = `<p class="error-message">${error.message}</p>`;
    reposContainer.innerHTML = "";
  }
}
