<script lang="ts">
    import { link, links, Router, useLocation } from "svelte-routing"
    import { type NavRouteType } from '../utils/types'
    import { storage } from "../store/storageManager"
    import { getAvatarUrl } from "../utils/avatars"
    import Icon from "../components/Icon.svelte";
    import { writable } from "svelte/store";

    const location = useLocation()

    const NavRoutes: NavRouteType[] = [
        {
            name: 'Dashboard',
            path: '/',
            icon: 'bx bxs-dashboard'
        },
        {
            name: 'Expenses History',
            path: '/expenses-history',
            icon: 'bx bx-history'
        },
        {
            name: 'Settings',
            path: '/settings',
            icon: 'bx bxs-cog'
        }
    ]

    // Create a reactive store for personal info
    const personalInfoStore = writable(storage.personalInfoManager.getPersonalInfo())
    
    // Update the store periodically or when needed
    setInterval(() => {
        personalInfoStore.set(storage.personalInfoManager.getPersonalInfo())
    }, 1000)
</script>

<nav>
    <div class="user-info">
        <div class="user-info__avatar">
            <img src={getAvatarUrl($personalInfoStore.avatar)} alt="user avatar">
        </div>
        <div class="user-info__name">
            {$personalInfoStore.name}
        </div>
    </div>

    <div class="links" use:links>
        <Router>            
            {#each NavRoutes as NavRoute}
                <a 
                    href={NavRoute.path} 
                    class="link" 
                    class:link--active={$location.pathname === NavRoute.path}
                >
                    <Icon 
                        icon={NavRoute.icon} 
                        size={18}
                    />
                    <span>{NavRoute.name}</span>
                </a>
            {/each}
            
        </Router>
    </div>
</nav>


<style>
    nav{
        display: flex;
        flex-direction: column;
        height: 100%;

        padding: 10px 20px;
        
        .user-info{
            display: flex;
            flex-direction: column;
            align-items: center;

            margin-bottom: 30px;

            .user-info__avatar{
                width: 80px;
                height: 80px;
                margin-bottom: 10px;

                border-radius: 50%;
                overflow: hidden;

                img{
                    width: 100%;
                    height: 100%;
                }
            }

            .user-info__name{
                color: var(--text-color);
                font-weight: bolder;
                font-size: 16px;
            }

        }

        .links{
            display: flex;
            flex-direction: column;

            .link{
                display: flex;
                align-items: center;
                padding: 10px 20px;

                font-size: 14px;
                text-decoration: none;
                user-select: none;

                color: var(--text-color);
                
                &.link--active {
                    padding-left: 19px;

                    color: var(--primary-color);
                    background-color: #28282a;

                    border: 1px solid #383838;
                    border-radius: 5px;

                    font-weight: bold;
                }

                &:not(:last-child){
                    margin-bottom: 5px;
                }   
            }
        }
    }
</style>

<!-- TODO: dynamic name and icon based on users settings -->