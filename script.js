document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Fetch GitHub Repositories
    const githubUsername = 'CDFire'; // Your GitHub username
    const repoContainer = document.getElementById('github-repos');

    if (repoContainer) { // Check if the element exists
        fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&direction=desc`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(repos => {
                repoContainer.innerHTML = ''; // Clear "Loading..." message
                // You might want to filter or limit the number of repos displayed
                // For example, to show top 6: repos.slice(0, 6).forEach(repo => {
                repos.forEach(repo => {
                    if (repo.fork) return; // Optionally skip forked repositories

                    const repoCard = document.createElement('div');
                    repoCard.classList.add('repo-card');

                    const repoName = document.createElement('h4');
                    const repoLink = document.createElement('a');
                    repoLink.href = repo.html_url;
                    repoLink.textContent = repo.name;
                    repoLink.target = '_blank'; // Open in new tab
                    repoName.appendChild(repoLink);

                    const repoDescription = document.createElement('p');
                    repoDescription.textContent = repo.description || 'No description provided.';
                    
                    const repoMeta = document.createElement('div');
                    repoMeta.classList.add('repo-meta');
                    
                    const languageSpan = document.createElement('span');
                    languageSpan.textContent = repo.language ? `Language: ${repo.language}` : 'Language: N/A';
                    
                    const starsSpan = document.createElement('span');
                    starsSpan.innerHTML = `★ ${repo.stargazers_count}`; // Star emoji

                    repoMeta.appendChild(languageSpan);
                    repoMeta.appendChild(starsSpan);

                    repoCard.appendChild(repoName);
                    repoCard.appendChild(repoDescription);
                    repoCard.appendChild(repoMeta);
                    repoContainer.appendChild(repoCard);
                });
            })
            .catch(error => {
                console.error("Could not fetch GitHub repositories:", error);
                repoContainer.innerHTML = '<p>Could not load repositories at this time.</p>';
            });
    } else {
        console.warn('Element with ID "github-repos" not found.');
    }
});
