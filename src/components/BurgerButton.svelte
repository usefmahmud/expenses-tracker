<script lang="ts">
    export let isOpen: boolean = true;
    export let onClick: () => void = () => {
        isOpen = !isOpen;
    };
</script>


<button 
    class='burger-button {isOpen ? 'burger-button--opened' : ''}'
    onclick={onClick}
    aria-label='Toggle Navigation'
>
    <span class="burger-buton__bar"></span>
    <span class="burger-buton__bar"></span>
    <span class="burger-buton__bar"></span>
    
    <span class="burger-button__shadow"></span>
</button>

<style lang="scss">
    .burger-button{
        position: relative;
        height: 35px;
        width: 35px;
        padding: 3px;

        background-color: transparent;
        border: none;
        border-radius: 50%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        transition: background-color 0.2s,
                    scale 0.2s;

        cursor: pointer;

        span.burger-buton__bar{
            z-index: 1;
            width: 80%;
            height: 2px;
            background-color: var(--primary-color);
            margin: 3px 0;

            transition: transform 0.5s, opacity 0.5s;
        }

        &.burger-button--opened{
            span{
                &:nth-child(1){
                    transform: rotate(45deg) translate(5px, 5px);
                }
                &:nth-child(2){
                    transform: translate(-100%, 0);
                    opacity: 0;
                }
                &:nth-child(3){
                    transform: rotate(-45deg) translate(6px, -6px);
                }
            }
        }

        span.burger-button__shadow{
            z-index: 0;
            position: absolute;
            height: 105%;
            width: 105%;

            background-color: var(--secondary-color);
            border-radius: 50%;

            opacity: 0;
            transition: opacity 0.3s;
        }

        &:hover{
            span.burger-button__shadow{
                opacity: .3;
            }
        }

        &:active{
            scale: 0.95;
            span.burger-button__shadow{
                opacity: .5;
            }
        }
    }
</style>