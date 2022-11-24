<script lang="ts">
export default {
    name: 'dashboard'
};
</script>

<script setup lang="ts">
import { onMounted, reactive, toRefs, ref } from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
import ConsumptionChart from './components/ConsumptionChart.vue';
import RechargeChart from './components/RechargeChart.vue';
import { getStatistic } from '@/api/dashboard';
import { Statistic } from '@/types';

const state = reactive({
    statistic: {} as Statistic
})

const { statistic } = toRefs(state);

function getStatisticData() {
    getStatistic().then(res => {
        state.statistic = res.data
    })
}

onMounted(() => {
    getStatisticData();
})


</script>

<template>
    <div class="dashboard-container">
        <!-- 数据 -->
        <el-row :gutter="40" class="card-panel__col">
            <el-col :xs="24" :sm="12" :lg="6" class="card-panel__col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-money">
                        <svg-icon icon-class="money" class-name="card-panel-icon" />
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">会员余额</div>
                        <div class="card-panel-num">{{ statistic.balance }}</div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6" class="card-panel__col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-message">
                        <svg-icon icon-class="money" class-name="card-panel-icon" />
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">会员消费</div>
                        <div class="card-panel-num">{{ statistic.memberConsumption }}</div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6" class="card-panel__col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-people">
                        <svg-icon icon-class="money" class-name="card-panel-icon" />
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">会员充值</div>
                        <div class="card-panel-num">{{ statistic.memberRechange }}</div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6" class="card-panel__col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-shopping">
                        <svg-icon icon-class="money" class-name="card-panel-icon" />
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">散客消费</div>
                        <div class="card-panel-num">{{ statistic.guestConsumption }}</div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <!-- Echarts 图表 -->
        <el-row :gutter="40">
            <el-col :span="12" class="card-panel__col">
                <ConsumptionChart id="consumptionChart" height="400px" width="100%" class="chart-container" />
            </el-col>
            <el-col :span="12" class="card-panel__col">
                <RechargeChart id="rechargeChart" height="400px" width="100%" class="chart-container" />
            </el-col>
        </el-row>
    </div>
</template>

<style lang="scss" scoped>
.dashboard-container {
    padding: 24px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .card-panel__col {
        margin-bottom: 12px;
    }

    .card-panel {
        height: 108px;
        cursor: pointer;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        color: #666;
        background: #fff;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
        border-color: rgba(0, 0, 0, 0.05);

        &:hover {
            .card-panel-icon-wrapper {
                color: #fff;
            }

            .icon-user {
                background: #e77541;
            }

            .icon-people {
                background: #40c9c6;
            }

            .icon-message {
                background: #36a3f7;
            }

            .icon-money {
                background: #f4516c;
            }

            .icon-shopping {
                background: #34bfa3;
            }
        }

        .icon-people {
            color: #40c9c6;

            .svg-icon {
                width: 4em !important;
                height: 4em !important;
            }
        }

        .icon-message {
            color: #36a3f7;

            .svg-icon {
                width: 4em !important;
                height: 4em !important;
            }
        }

        .icon-money {
            color: #f4516c;

            .svg-icon {
                width: 4em !important;
                height: 4em !important;
            }
        }

        .icon-shopping {
            color: #34bfa3;

            .svg-icon {
                width: 4em !important;
                height: 4em !important;
            }
        }

        .card-panel-icon-wrapper {
            float: left;
            margin: 14px 0 0 14px;
            padding: 16px;
            transition: all 0.38s ease-out;
            border-radius: 6px;
        }

        .card-panel-description {
            float: right;
            font-weight: bold;
            margin: 26px 20px 0;

            .card-panel-text {
                line-height: 18px;
                color: rgba(0, 0, 0, 0.45);
                font-size: 16px;
                margin-bottom: 12px;
            }

            .card-panel-num {
                font-size: 20px;
                text-align: right;
            }
        }
    }

    .chart-container {
        background: #ffffff;
    }
}
</style>