<script lang="ts">
  import Icon from "../components/Icon.svelte"
  import Modal from "../components/Modal.svelte";
  import { storage } from "../store/storageManager";
  import type { Income } from "../utils/types";
  import AddIncome from "./AddIncome.svelte";

  const incomesManager = storage.incomesManager
  const incomeStore = incomesManager.incomes

  let incomes: Income[] = []
  $: incomes = $incomeStore.data

  let isAddIncomeOpen: boolean = false
  const handleCloseIncomeModal = () => {
    isAddIncomeOpen = false
  }
  const handleOpenIncomeModal = () => {
    isAddIncomeOpen = true
  }

  const handleDeleteIncome = (id: number) => {
    incomesManager.removeIncome(id)
  }

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }
</script>

<div class="incomes-tab">
  <div class="incomes__grid">
    {#each incomes as income (income.id)}
      <div class="income__card">
        <div class="income__content">
          <div class="income__icon">
            <Icon 
              icon='bx bx-dollar'
              size={23}
              color='#06b0a1'
            />
          </div>
          <div class="income__details">
            <div class="income__title">
              {income.title}
            </div>
            <div class="income__amount">
              <span>$</span>
              {income.amount.toFixed(2)}
            </div>
            <div class="income__date">
              {formatDate(income.date)}
            </div>
          </div>
          <button 
            class="delete__btn"
            onclick={() => handleDeleteIncome(income.id)}
            title="Delete income"
          >
            <Icon 
              icon='bx bx-trash'
              size={16}
              color='#ff4757'
            />
          </button>
        </div>
      </div>
    {/each}

    <!-- Add Income Card -->
    <div class="income__card">
      <div 
        class="income__content add-income__content"
        role="button"
        tabindex="0"
        onclick={handleOpenIncomeModal}
        onkeydown={(e) => { 
          if(e.key === 'Enter' || e.key === ' '){
            handleOpenIncomeModal()
          }
        }}
      >
        <div class="income__icon">
          <Icon 
            icon='bx bx-plus'
            size={23}
          />
        </div>
        <div class="income__details">
          <div class="income__title">
            Add Income
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{#if isAddIncomeOpen}
  <Modal 
    title='ADD INCOME'
    handleCloseModal={handleCloseIncomeModal}
  >
    <AddIncome 
      {handleCloseIncomeModal}
    />
  </Modal>
{/if}

<style lang="scss">
  .incomes-tab{
    height: 100%;
    max-width: 1000px;
    width: 100%;
    font-family: 'Inter', sans-serif;

    .incomes__grid{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(5, 70px);
      grid-column-gap: 20px;
      grid-row-gap: 20px;

      .income__card{
        position: relative;          .income__content{
            height: 100%;
            display: flex;
            align-items: center;
            padding: 12px;
            border-radius: 12px;
            position: relative;
            overflow: hidden;

            border: 1.5px solid #383838;
            cursor: pointer;
            user-select: none;
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, var(--active-bg-color) 0%, rgba(255, 255, 255, 0.02) 100%);

            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

            // Subtle gradient overlay
            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(135deg, transparent 0%, rgba(6, 176, 161, 0.03) 100%);
              opacity: 0;
              transition: opacity 0.3s ease;
            }

            &.add-income__content {
              border-style: dashed;
              border-color: #383838;
              background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.01) 100%);

              .income__icon {
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
                color: rgba(255, 255, 255, 0.5);
                box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.1);
              }

              .income__details {
                .income__title {
                  font-size: 15px;
                  font-weight: 500;
                  color: var(--text-color);
                  opacity: 0.8;
                  text-transform: uppercase;
                  letter-spacing: 0.8px;
                  background: linear-gradient(135deg, var(--text-color) 0%, rgba(255, 255, 255, 0.6) 100%);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                }
              }

              &:hover {
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(6, 176, 161, 0.02) 100%);
                border-color: #4a4a4a;
                transform: translateY(-2px) scale(1.01);
                box-shadow: 
                  0 8px 25px rgba(0, 0, 0, 0.12),
                  0 0 0 1px rgba(255, 255, 255, 0.05);

                .income__icon {
                  transform: scale(1.05) rotate(3deg);
                  box-shadow: 
                    inset 0 1px 2px rgba(255, 255, 255, 0.2),
                    0 4px 12px rgba(0, 0, 0, 0.1);
                }
              }

              &:active {
                scale: 0.98;
                transform: translateY(0);
              }
            }            .income__icon{
              background: linear-gradient(135deg, #124241 0%, #0a3332 100%);
              height: 100%;
              width: auto;
              aspect-ratio: 1 / 1;
              border-radius: 8px;

              display: flex;
              align-items: center;
              justify-content: center;

              margin-right: 12px;
              position: relative;

              box-shadow: 
                0 4px 12px rgba(18, 66, 65, 0.4),
                inset 0 1px 2px rgba(255, 255, 255, 0.1);
              border: 1px solid rgba(6, 176, 161, 0.2);
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

              // Shine effect
              &::after {
                content: '';
                position: absolute;
                top: 2px;
                left: 2px;
                right: 2px;
                height: 50%;
                background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 100%);
                border-radius: 6px 6px 12px 12px;
                opacity: 0.8;
              }
            }            .income__details{
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              flex: 1;
              position: relative;

              .income__title{
                font-size: 14px;
                font-weight: 600;
                color: var(--text-color);
                margin-bottom: 4px;
                font-family: 'Inter', sans-serif;
                letter-spacing: 0.3px;
                line-height: 1.2;
                transition: all 0.3s ease;
                position: relative;

                // Subtle text shadow for depth
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
              }

              .income__amount{
                font-size: 18px;
                font-weight: 700;
                background: linear-gradient(135deg, #195d5b 0%, #0d3f3e 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                letter-spacing: 0.4px;
                transition: all 0.3s ease;
                position: relative;

                span{
                  margin-right: 3px;
                  font-weight: 600;
                  opacity: 0.9;
                }

                // Glow effect on hover (will be activated via parent hover)
                &::after {
                  content: attr(data-amount);
                  position: absolute;
                  top: 0;
                  left: 0;
                  background: linear-gradient(135deg, #06b0a1 0%, #04a094 100%);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                  opacity: 0;
                  transition: opacity 0.3s ease;
                  filter: blur(1px);
                }
              }

              .income__date{
                font-size: 11px;
                color: var(--secondary-color);
                opacity: 0.7;
                font-weight: 400;
                letter-spacing: 0.3px;
                text-transform: uppercase;
                transition: all 0.3s ease;
                position: relative;

                // Subtle underline effect
                &::after {
                  content: '';
                  position: absolute;
                  bottom: -2px;
                  left: 0;
                  width: 0;
                  height: 1px;
                  background: linear-gradient(90deg, #06b0a1, transparent);
                  transition: width 0.3s ease;
                }
              }
            }            .delete__btn{
              position: absolute;
              top: 8px;
              right: 8px;
              background: linear-gradient(135deg, rgba(255, 71, 87, 0.9) 0%, rgba(255, 55, 70, 0.9) 100%);
              border: 1px solid rgba(255, 71, 87, 0.3);
              cursor: pointer;
              padding: 8px;
              border-radius: 8px;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              opacity: 0;
              z-index: 10;
              display: flex;
              align-items: center;
              justify-content: center;
              backdrop-filter: blur(10px);
              box-shadow: 
                0 4px 12px rgba(255, 71, 87, 0.3),
                inset 0 1px 2px rgba(255, 255, 255, 0.2);

              // Pulse effect
              &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 100%;
                height: 100%;
                background: rgba(255, 71, 87, 0.4);
                border-radius: 8px;
                transform: translate(-50%, -50%) scale(0);
                transition: transform 0.3s ease;
              }

              &:hover{
                background: linear-gradient(135deg, rgba(255, 71, 87, 1) 0%, rgba(255, 45, 60, 1) 100%);
                opacity: 1;
                transform: scale(1.15) rotate(5deg);
                box-shadow: 
                  0 6px 20px rgba(255, 71, 87, 0.5),
                  inset 0 1px 2px rgba(255, 255, 255, 0.3);

                &::before {
                  transform: translate(-50%, -50%) scale(1.2);
                  opacity: 0;
                }
              }

              &:active{
                scale: 0.9;
                transform: rotate(0deg);
                background: linear-gradient(135deg, rgba(255, 71, 87, 0.8) 0%, rgba(255, 35, 50, 0.8) 100%);
              }
            }            &:hover {
              border-color: #4a4a4a;
              transform: translateY(-3px) scale(1.02);
              box-shadow: 
                0 12px 30px rgba(0, 0, 0, 0.15),
                0 0 0 1px rgba(6, 176, 161, 0.1),
                inset 0 1px 2px rgba(255, 255, 255, 0.05);

              &::before {
                opacity: 1;
              }

              .income__icon {
                transform: scale(1.1) rotateY(10deg);
                box-shadow: 
                  0 8px 25px rgba(18, 66, 65, 0.6),
                  inset 0 1px 3px rgba(255, 255, 255, 0.2);
                border-color: rgba(6, 176, 161, 0.4);

                &::after {
                  opacity: 1;
                }
              }

              .income__details {
                .income__title {
                  color: var(--text-color);
                  opacity: 1;
                  transform: translateX(2px);
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }

                .income__amount {
                  transform: scale(1.05);
                  filter: brightness(1.2);

                  &::after {
                    opacity: 0.3;
                  }
                }

                .income__date {
                  opacity: 1;
                  color: #06b0a1;

                  &::after {
                    width: 100%;
                  }
                }
              }

              .delete__btn {
                opacity: 0.8;
                transform: scale(1) rotate(0deg);
              }
            }

            &:active{
              scale: 0.98;
              transform: translateY(-1px);
              transition: all 0.1s ease;
            }

            // Ripple effect on click
            &::after {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              width: 0;
              height: 0;
              background: radial-gradient(circle, rgba(6, 176, 161, 0.3) 0%, transparent 70%);
              border-radius: 50%;
              transform: translate(-50%, -50%);
              transition: width 0.4s ease, height 0.4s ease;
              pointer-events: none;
              z-index: 1;
            }

            &:active::after {
              width: 120%;
              height: 120%;
            }
        }

        &:not(:has(.add-income__content)) {
          .income__content:hover {
            background: linear-gradient(135deg, rgba(18, 66, 65, 0.08) 0%, rgba(6, 176, 161, 0.03) 100%);
          }

          // Enhanced glow effect for income cards
          &:hover::before {
            content: '';
            position: absolute;
            inset: -2px;
            background: linear-gradient(135deg, rgba(6, 176, 161, 0.2), rgba(18, 66, 65, 0.1), rgba(6, 176, 161, 0.2));
            border-radius: 14px;
            z-index: -1;
            opacity: 0.6;
            filter: blur(8px);
            animation: glow-pulse 2s ease-in-out infinite alternate;
          }
        }

        // Enhanced hover effect for income cards (not add button)
        &:not(:has(.add-income__content)):hover {
          .income__content {
            .income__title {
              color: var(--text-color);
              opacity: 1;
              transform: translateX(3px);
            }

            .income__amount {
              background: linear-gradient(135deg, #06b0a1 0%, #04a094 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              transform: scale(1.05);
            }

            .income__date {
              opacity: 1;
              color: #06b0a1;
            }
          }
        }
      }
    }
  }

  // Keyframe animations for enhanced effects
  @keyframes glow-pulse {
    0% {
      opacity: 0.4;
      transform: scale(1);
    }
    100% {
      opacity: 0.8;
      transform: scale(1.02);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-2px);
    }
  }

  // Enhanced card entrance animation
  .income__card {
    animation: slideInUp 0.6s ease-out;
    animation-fill-mode: both;

    @for $i from 1 through 20 {
      &:nth-child(#{$i}) {
        animation-delay: #{$i * 0.1}s;
      }
    }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  // Add shimmer effect to income amounts
  .income__amount {
    background-size: 200% 100%;
    background-image: linear-gradient(135deg, #195d5b 25%, #06b0a1 50%, #195d5b 75%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s ease-in-out infinite;
  }
</style>