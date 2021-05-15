<template>
  <div class="home" :class="{'light-background': !isDarkMode, 'dark-background': isDarkMode}">
    <Header></Header>
    <el-container class="top-switch-container">
      <theme-switch class="top-switch"></theme-switch>
    </el-container>

    <el-container>
      <!-- 左边部分 -->
      <el-container class="left-container">
        <el-container class="search-container">
          <label class="search-label"
                 :class="{'search-label-light': isDarkMode, 'search-label-dark': !isDarkMode}">search your Country or district</label>
          <div class="search-box">
            <img src="../assets/search.png"
                 style="height: 15px; width: 15px;
                 position: relative;
                 top: 29px;
                 left: -46%;"
            />
            <input placeholder="China"
                   :class="{'light-input-field': isDarkMode, 'dark-input-field': !isDarkMode}">
          </div>
        </el-container>

        <div class="cards">
          <label style="line-height: 40px; color: rgba(255,255,255,0.3); font-weight: 600"> Total for last 7 days</label>
          <div class="card1" :class="{'light-card': !isDarkMode, 'dark-card': isDarkMode}" >
            <div style="display: flex;
                  flex-direction: row;
                  justify-content: center;
                  align-items: center;
                  width: 90%;
                  margin: 40px 5% 50px;
        ">
              <el-date-picker
                v-model="dateSelected"
                type="date"
                placeholder="select a date to analyze"
                value-format=“yyyy-MM-dd”
              ></el-date-picker>
              <div @click="selectNewDate"
                   style="width: 60px;
                    height: 40px;
                    background: rgba(255,255,255,0.3);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 5px;
                    margin-left: 30px;
          ">
                <label>GO</label>
              </div>
            </div>

            <!-- 确诊+死亡总计 -->
            <div style="width: 70%;display: flex;flex-direction: row;justify-content: space-between; margin-bottom: 40px">
              <!-- confirmed box -->
              <div class="red-bg" >
                <label style="opacity:0.8;color: #e23128;font-weight: 700;font-size: 16px;line-height: 50px;">Confirmed</label>
                <label style="opacity:0.5;color: #e23128;font-weight: 700;margin-top: 20px">+ 1580</label>
                <label style="opacity:0.9;color: #e23128;font-weight: 600;font-size: 25px;line-height: 50px">120,000</label>
              </div>

              <!-- fatal box -->
              <div class="gray-bg">
                <label style="opacity:0.8;color: #b1afaf;font-weight: 700;font-size: 16px;line-height: 50px;">Fatal</label>
                <label style="opacity:0.5;color: #b1afaf;font-weight: 700;margin-top: 20px">+ 1580</label>
                <label style="opacity:0.9;color: #b1afaf;font-weight: 600;font-size: 25px;line-height: 50px">120,000</label>
              </div>
            </div>
            <!-- 感染+治愈总计 -->
            <div style="width: 70%;display: flex;flex-direction: row;justify-content: space-between;">
              <!-- infected box -->
              <div class="blue-bg">
                <label style="opacity:0.8;color: #5e7eb0;font-weight: 700;font-size: 16px;line-height: 50px;">Infected</label>
                <label style="opacity:0.5;color: #5e7eb0;font-weight: 700;margin-top: 20px">+ 1580</label>
                <label style="opacity:0.9;color: #5e7eb0;font-weight: 600;font-size: 25px;line-height: 50px">120,000</label>
              </div>

              <!-- recovered box -->
              <div class="green-bg">
                <label style="opacity:0.8;color: #a6ca82;font-weight: 700;font-size: 16px;line-height: 50px;">Recovered</label>
                <label style="opacity:0.5;color: #a6ca82;font-weight: 700;margin-top: 20px">+ 1580</label>
                <label style="opacity:0.9;color: #a6ca82;font-weight: 600;font-size: 25px;line-height: 50px">120,000</label>
              </div>
            </div>
          </div>

          <label style="line-height: 40px; color: rgba(255,255,255,0.3); font-weight: 600;margin-top: 50px"> Data for last 7 days</label>
          <!-- 数据表格 -->
          <el-container
            style="display: flex;
            flex-direction: column;
            width: 100%;
            margin-top: 20px;
          ">
            <div style="display: flex;
              flex-direction: row;
              justify-content: space-between;
              margin-left: 5%;
              margin-right: 5%;
              line-height: 40px;
              align-items: center;
            ">
              <label style="width: 24%;text-align: left;font-weight: 600;color: rgba(255,255,255,0.8)">Date</label>
              <label style="width: 21%;text-align: left;font-weight: 600;color: rgba(255,255,255,0.8)">Confirmed</label>
              <label style="width: 15%;text-align: left;font-weight: 600;color: rgba(255,255,255,0.8)">Fatal</label>
              <label style="width: 20%;text-align: left;font-weight: 600;color: rgba(255,255,255,0.8)">Infected</label>
              <label style="width: 20%;text-align: left;font-weight: 600;color: rgba(255,255,255,0.8)">Recovered</label>
            </div>
            <div v-for="index in 7" :key="index"
                 style="display: flex;
                 justify-content: flex-start;
                 align-items: center;
                 flex-direction: row;
                 width: 90%;
                 margin-left: 5%;
                 margin-right: 5%;
                 height: 40px;"
                 :class="{'gray-back': index % 2 == 1}"
            >
              <label style="width: 24%;text-align: left;color: rgba(255,255,255,0.5)">{{oldModelDateList[index]}}</label>
              <label style="width: 21%;text-align: left;color: rgba(255,255,255,0.5)">{{oldModelConfirmedList[index]}}</label>
              <label style="width: 15%;text-align: left;color: rgba(255,255,255,0.5)">{{oldModelFatalList[index]}}</label>
              <label style="width: 20%;text-align: left;color: rgba(255,255,255,0.5)">{{oldModelInfectedList[index]}}</label>
              <label style="width: 20%;text-align: left;color: rgba(255,255,255,0.5)">{{oldModelRecoveredList[index]}}</label>
              <label></label>
            </div>
          </el-container>
        </div>
      </el-container>

      <!-- 右边部分 -->
      <el-container class="right-container">
        <div class="chart1">
          <!-- title and toggle -->
          <div class="chart-title-div">
            <label class="chart-title">Latest 7 days Overview</label>
            <div class="toggle">
              <div class="days" ref="days" @click="toggleDays">Days</div>
              <div class="weeks" ref="weeks" @click="toggleWeeks">Weeks</div>
              <div class="months" ref="months" @click="toggleMonths">Months</div>
            </div>
          </div>

          <!-- chart1 -->
          <apexchart type="line" height="350" :options="chartOptions2"
                     :series="series2"></apexchart>
        </div>

      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import store1 from '@/store'
import 'animate.css'
import ThemeSwitch from '@/components/ThemeSwitch'
// eslint-disable-next-line no-unused-vars
import { db } from '@/firebase'
import Header from '@/components/Header'
import VueApexCharts from 'vue-apexcharts'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    Header,
    ThemeSwitch,
    apexchart: VueApexCharts
  },
  data () {
    return {
      show1: false,
      searchDistrict: '',
      oldModelAllData: [],
      oldModelDateList: [],
      oldModelConfirmedList: [],
      oldModelFatalList: [],
      oldModelInfectedList: [],
      oldModelRecoveredList: [],
      dateSelected: '',
      chartOptions1: {
        colors: ['#14f1d9', '#7b42f6'],
        legend: {
          labels: {
            colors: ['white']
          },
          position: 'top'
        },
        tooltip: {
          theme: 'dark'
        },
        grid: {
          xaxis: {
            lines: {
              show: false
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        chart: {
          id: 'chart1'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },

      series2: [{
        name: 'TEAM A',
        type: 'column',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
      }, {
        name: 'TEAM B',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
      }, {
        name: 'TEAM C',
        type: 'line',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
      }],
      chartOptions2: {
        colors: ['#7ea9dd', '#2e4881', '#385ade'],
        chart: {
          height: 350,
          type: 'line',
          stacked: false
        },
        stroke: {
          width: [0, 1, 2],
          curve: 'smooth'
        },
        plotOptions: {
          bar: {
            columnWidth: '20%'
          }
        },
        legend: {
          labels: {
            colors: ['white']
          },
          position: 'top'
        },
        grid: {
          xaxis: {
            lines: {
              show: false
            }
          },
          yaxis: { // 横着的线
            lines: {
              show: true
            }
          }
        },
        fill: {
          opacity: [0.25, 0.25, 0.6],
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: 'vertical',
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
          }
        },
        labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
          '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
        ],
        markers: {
          size: 0.5
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          title: {
            text: 'Points'
          },
          min: 0
        },
        tooltip: {
          theme: 'dark',
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== 'undefined') {
                return y.toFixed(0) + 'points'
              }
              return y
            }
          }
        }
      }
    }
  },
  mounted () {
    this.show1 = true
  },
  created () {
    axios
      .get('https://www.fastmock.site/mock/5cbbd84514072b77a738b4c90c503231/corona/old30')
      .then(res => {
        this.oldModelAllData = res.data.data.old_model_list
        for (var i = 0; i < this.oldModelAllData.length; i++) {
          this.oldModelDateList.push(this.oldModelAllData[i].Date.toString())
          this.oldModelConfirmedList.push(this.oldModelAllData[i].Confirmed)
          this.oldModelFatalList.push(this.oldModelAllData[i].Fatal)
          this.oldModelInfectedList.push(this.oldModelAllData[i].Infected)
          this.oldModelRecoveredList.push(this.oldModelAllData[i].Recovered)
        }
      })
      .catch(error => {
        console.log('There is an error: ' + error.response)
      })
  },
  computed: {
    isDarkMode () {
      return store1.getters.getIsDarkMode
    }
  },
  methods: {
    toggleDays () {
      this.$refs.days.style.color = 'white'
      this.$refs.days.style.background = '#56ccf2'
      this.$refs.days.style.borderRadius = '4px'

      this.$refs.weeks.style.color = '#5b6175'
      this.$refs.weeks.style.background = 'none'
      this.$refs.weeks.style.borderRadius = 'none'

      this.$refs.months.style.color = '#5b6175'
      this.$refs.months.style.background = 'none'
      this.$refs.months.style.borderRadius = 'none'
    },
    toggleWeeks () {
      this.$refs.weeks.style.color = 'white'
      this.$refs.weeks.style.background = '#56ccf2'
      this.$refs.weeks.style.borderRadius = '4px'

      this.$refs.months.style.color = '#5b6175'
      this.$refs.months.style.background = 'none'
      this.$refs.months.style.borderRadius = 'none'

      this.$refs.days.style.color = '#5b6175'
      this.$refs.days.style.background = 'none'
      this.$refs.days.style.borderRadius = 'none'
    },
    toggleMonths () {
      this.$refs.months.style.color = 'white'
      this.$refs.months.style.background = '#56ccf2'
      this.$refs.months.style.borderRadius = '4px'

      this.$refs.days.style.color = '#5b6175'
      this.$refs.days.style.background = 'none'
      this.$refs.days.style.borderRadius = 'none'

      this.$refs.weeks.style.color = '#5b6175'
      this.$refs.weeks.style.background = 'none'
      this.$refs.weeks.style.borderRadius = 'none'
    },
    selectNewDate () {
      console.log(this.dateSelected)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/colors.scss";
@import "../assets/typography.scss";

.home{
  width: 100%;
  height: 200vh;
}
.gray-back {
  background: rgba(255, 255, 255, 0.05)
}
.top-switch-container {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  .top-switch {
    margin-right: 10px;
  }
}
.left-container {
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.search-container {
  width: 90%;
  margin-left: 55%*0.05;
  margin-bottom: 20px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  // background-color: #7b42f6;
  .search-label {
    width: 100%;
    // background-color: black;
    text-align: center;
    font-weight: 500;
    opacity: 0.6;
    margin-bottom: 20px;
  }
  .search-box{
    width: 100%;
    height: 36px;
  }
}
input {
  border: 0px solid rgba(255,255,255,0.2);
  box-sizing: border-box;
  border-radius: 4px;
  width: 99%;
  height: 100%;
  font-size: 18px;
  color: white;
  padding-left: 30px;
}

.light-input-field {
  background: rgba(255,255,255,0.2);
  &::placeholder {
    color: rgba(255,255,255,0.3);
  }
}
.dark-input-field {
  background: rgba(195, 200, 208, 0.2);
  &::placeholder {
    color: rgba(88, 84, 84, 0.3);
  }
}

.search-label-light {
  color: #cbcdcf;
}
.search-label-dark {
  color: #404965;
}

.cards {
  width: 100%;
  // height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  // background: white;
}
.card1 {
  width: 90%;
  height: 500px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.light-card {
  background: white;
  box-shadow: 5px 5px 18px rgba(0,0,0,0.15);
  &:hover {
    box-shadow: 8px 8px 18px rgba(0,0,0,0.25);
  }
}
.dark-card {
  background: $super-dark-blue;
  box-shadow: 5px 5px 18px rgba(255,255,255,0.15);
  &:hover {
    box-shadow: 8px 8px 18px rgba(255,255,255,0.25);
  }
}
.red-bg {
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    background: rgba(226,49,40,0.1);
    border-radius: 10px;
  }
}
.gray-bg {
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    background: rgba(177,175,175,0.1);
    border-radius: 10px;
  }
}
.blue-bg {
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    background: rgba(94,126,176,0.1);
    border-radius: 10px;
  }
}
.green-bg {
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    background: rgba(166,202,130,0.1);
    border-radius: 10px;
  }
}
.right-container {
  width: 55%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 10px;
}

@mixin toggle-settings {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.chart1 {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;

  .chart-title-div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 30px;
  }
  .chart-title {
    @include headings-3();
    color: white;
    opacity: 0.8;
    margin-left: 20px;
  }
  .toggle {
    @include small-text-bold();
    color: $dark-gray;
    height: 30px;
    width: 200px;
    border-radius: 6px;
    padding: 5px;
    display: flex;
    flex-wrap: nowrap;
    background: rgba(255,255,255,0.1);
    border: 0.3px solid rgba(255,255,255,0.1);

    &:hover {
      cursor: pointer;
    }
  }
  .days {
    @include toggle-settings;
    background: $teal;
    border-radius: 4px;
    color: white;
    width: 30%;
  }
  .weeks {
    @include toggle-settings;
    width: 33%;
  }
  .months {
    @include toggle-settings;
    width: 37%;
  }
}

</style>
