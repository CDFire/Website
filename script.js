// In your script.js
const githubUsername = 'CDFire';
const repoContainer = document.getElementById('github-repos');
// Define the specific repository names you want to display
const desiredRepoNames = ["UnpairedStyleTransfer", "TrafficDetector", "AIResumeTailor", "CognitiveBiasDetector", "HandMouse"]; 

if (repoContainer) {
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&direction=desc&per_page=100`) // Fetch up to 100 repos
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(allRepos => {
            repoContainer.innerHTML = ''; // Clear "Loading..."

            // Filter the repositories
            const filteredRepos = allRepos.filter(repo => 
                desiredRepoNames.includes(repo.name) && !repo.fork // Also check if it's not a fork
            );

            if (filteredRepos.length === 0) {
                repoContainer.innerHTML = '<p>No specified repositories found.</p>';
                return;
            }

            filteredRepos.forEach(repo => {
                // ... (your existing code to create and append repoCard)
                const repoCard = document.createElement('div');
                repoCard.classList.add('repo-card');

                const repoNameEl = document.createElement('h4'); // Renamed for clarity
                const repoLink = document.createElement('a');
                repoLink.href = repo.html_url;
                repoLink.textContent = repo.name;
                repoLink.target = '_blank';
                repoNameEl.appendChild(repoLink);

                const repoDescription = document.createElement('p');
                repoDescription.textContent = repo.description || 'No description provided.';
                
                const repoMeta = document.createElement('div');
                repoMeta.classList.add('repo-meta');
                
                const languageSpan = document.createElement('span');
                languageSpan.textContent = repo.language ? `Language: ${repo.language}` : 'Language: N/A';
                
                const starsSpan = document.createElement('span');
                starsSpan.innerHTML = `★ ${repo.stargazers_count}`;

                repoMeta.appendChild(languageSpan);
                repoMeta.appendChild(starsSpan);

                repoCard.appendChild(repoNameEl);
                repoCard.appendChild(repoDescription);
                repoCard.appendChild(repoMeta);
                repoContainer.appendChild(repoCard);
            });
        })
        .catch(error => {
            console.error("Could not fetch GitHub repositories:", error);
            repoContainer.innerHTML = '<p>Could not load repositories at this time.</p>';
        });
}
