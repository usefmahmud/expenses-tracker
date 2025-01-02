<script lang="ts">
    import { link, links, Router } from "svelte-routing"
</script>

<nav>
    <div class="logo">
        <a href="/" use:link>FINACIAL <br> TRACKER</a>
    </div>
    <div class="links" use:links>
        <Router>
            <a href="/">Dashboard</a>
            <a href="/settings">Settings</a>
        </Router>
    </div>
</nav>


<style>
    nav{
        display: flex;
        flex-direction: column;
        .logo{
            a{
                font-size: 1.5rem;
                font-weight: bold;
                color: #333;
                text-decoration: none;
            }
        }
    }
</style>

