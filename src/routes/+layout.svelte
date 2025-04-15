<script>
    import '../global.css';
</script>

<div>
    <main>
        <slot />
    </main>
    <footer>
        <div class="social-links">
            <a href="https://github.com/MokeEire" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i class="fab fa-github"></i>
            </a>
            <a href="https://public.tableau.com/app/profile/mokeeire" target="_blank" rel="noopener noreferrer" aria-label="Tableau">
                <i class="fas fa-chart-bar"></i>
            </a>
            <a href="https://linkedin.com/in/markkbarrett" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://linktr.ee/MokeEire" target="_blank" rel="noopener noreferrer" aria-label="LinkTree">
                <i class="fas fa-link"></i>
            </a>
        </div>
        <p>© 2025 Mark Barrett</p>
        <p>Built with SvelteKit</p>
    </footer>
</div>

<style>
    footer {
        text-align: center;
        padding: 1em;
        background-color: #f9f9f9; /* Subtle background color */
        color: #666; /* Muted text color */
        font-size: 0.85rem; /* Slightly reduced font size */
        border-top: 1px solid #ddd; /* Light border for separation */
        margin-top: 8em; /* Add spacing above the footer */
        margin-bottom: 1em; /* Added spacing beneath footer */
    }

    footer p {
        margin: 0.5em 0; /* Reduce spacing between paragraphs */
    }

    footer a {
        color: #007acc; /* Link color */
        text-decoration: none;
    }

    footer a:hover {
        text-decoration: underline;
    }

    .social-links {
        margin-bottom: 1em; /* Add spacing below social links */
        display: flex;
        justify-content: center;
        gap: 1em;
    }

    .social-links i {
        font-size: 24px;
        color: #666;
        transition: color 0.3s;
    }

    .social-links i:hover {
        color: #007acc; /* Highlight color on hover */
    }
</style>