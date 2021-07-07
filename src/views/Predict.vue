<template>
  <div class="predict" :class="{'light-background': !isDarkMode, 'dark-background': isDarkMode}">
    <Header></Header>
    <el-container class="top-switch-container">
      <ThemeSwitch></ThemeSwitch>
    </el-container>

    <el-container>
      <!-- 左边部分 -->
      <el-container class="left-container">
        <el-container class="search-container">
          <label class="search-label"
                 :class="{'search-label-light': isDarkMode, 'search-label-dark': !isDarkMode}">select a country to predict</label>
          <div class="search-box">
            <el-select v-model="country" placeholder="">
              <el-option
                v-for="item in countryOptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <div @click="selectNewCountry"
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
        </el-container>

        <div class="cards" style="margin-top: 40px">
          <div class="card1" :class="{'light-card': !isDarkMode, 'dark-card': isDarkMode}" >
            <label style="line-height: 40px;
          color: rgba(255,255,255,0.3);
          font-weight: 600;">
              Predictions for the next 7 days:
            </label>
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
                :picker-options="datePickerOptions"
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
                <label style="opacity:0.5;color: #e23128;font-weight: 700;margin-top: 20px">+ {{ this.addedConfirmedAmount }}</label>
                <label style="opacity:0.9;color: #e23128;font-weight: 600;font-size: 25px;line-height: 50px">{{ this.last7ConfirmedAmount }}</label>
              </div>

              <!-- fatal box -->
              <div class="gray-bg">
                <label style="opacity:0.8;color: #b1afaf;font-weight: 700;font-size: 16px;line-height: 50px;">Fatal</label>
                <label style="opacity:0.5;color: #b1afaf;font-weight: 700;margin-top: 20px">+ {{ this.addedFatalAmount }}</label>
                <label style="opacity:0.9;color: #b1afaf;font-weight: 600;font-size: 25px;line-height: 50px">{{ this.last7FatalAmount }}</label>
              </div>
            </div>
            <!-- 感染+治愈总计 -->
            <div style="width: 70%;display: flex;flex-direction: row;justify-content: space-between;">
              <!-- infected box -->
              <div class="blue-bg">
                <label style="opacity:0.8;color: #5e7eb0;font-weight: 700;font-size: 16px;line-height: 50px;">Infected</label>
                <label style="opacity:0.5;color: #5e7eb0;font-weight: 700;margin-top: 20px">+ {{ this.addedInfectedAmount }}</label>
                <label style="opacity:0.9;color: #5e7eb0;font-weight: 600;font-size: 25px;line-height: 50px">{{ this.last7InfectedAmount }}</label>
              </div>

              <!-- recovered box -->
              <div class="green-bg">
                <label style="opacity:0.8;color: #a6ca82;font-weight: 700;font-size: 16px;line-height: 50px;">Recovered</label>
                <label style="opacity:0.5;color: #a6ca82;font-weight: 700;margin-top: 20px">+ {{ this.addedRecoveredAmount }}</label>
                <label style="opacity:0.9;color: #a6ca82;font-weight: 600;font-size: 25px;line-height: 50px">{{ this.last7RecoveredAmount }}</label>
              </div>
            </div>
          </div>

          <el-container
            style="display: flex;
            flex-direction: column;
            width: 90%;
            justify-content: center;
            align-items: center;
            background-color: #5b6175;
            height: 100px;
            box-shadow: 5px 5px 18px rgba(255,255,255,0.15);
            margin-top: 30px;
            border-radius: 20px;
          ">
            <label style="line-height: 40px;
            color: rgba(255,255,255,0.6);
            font-weight: 600;
            ">
              Recommendation for epidemic control measures:
            </label>
            <label style="line-height: 40px;
            color: rgba(255,255,255,0.9);
            font-weight: 600;margin-top: 5px;
            font-size: xx-large;
            ">{{this.suggestionName}}</label>
          </el-container>

          <label style="line-height: 40px;
          color: rgba(255,255,255,0.3);
          font-weight: 600;margin-top: 50px;
          width: 80%">{{this.suggestionWords}}</label>

          <label style="line-height: 40px;
          color: rgba(255,255,255,0.3);
          font-weight: 600;margin-top: 50px">
            Data predicted for the next 7 days
          </label>
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
            <div v-for="index in (0,7)" :key="index"
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
              <label style="width: 24%;text-align: left;color: rgba(255,255,255,0.5)">{{ last7dateList[index - 1] }}</label>
              <label style="width: 21%;text-align: left;color: rgba(255,255,255,0.5)">{{ last7ConfirmedList[index - 1] }}</label>
              <label style="width: 15%;text-align: left;color: rgba(255,255,255,0.5)">{{ last7FatalList[index - 1] }}</label>
              <label style="width: 20%;text-align: left;color: rgba(255,255,255,0.5)">{{ last7InfectedList[index - 1] }}</label>
              <label style="width: 20%;text-align: left;color: rgba(255,255,255,0.5)">{{ last7RecoveredList[index - 1] }}</label>
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
            <label class="chart-title">Prediction for the next 7 days using αSIR-F</label>
          </div>

          <!-- chart1 -->
          <apexchart type="line" height="350" :options="chartOptions2"
                     :series="series2"></apexchart>
        </div>

        <!-- 下面四个级联chart -->
        <div id="wrapper" style="width: 100%;
              justify-content: center;">
            <div id="chart-line1">
              <apexchart type="line" height="160" :options="chartOptionsLine1" :series="seriesLine1"></apexchart>
            </div>
            <div id="chart-line2">
              <apexchart type="line" height="160" :options="chartOptionsLine2" :series="seriesLine2"></apexchart>
            </div>
            <div id="chart-line3">
              <apexchart type="line" height="160" :options="chartOptionsLine3" :series="seriesLine3"></apexchart>
            </div>
            <div id="chart-line4">
              <apexchart type="line" height="160" :options="chartOptionsLine4" :series="seriesLine4"></apexchart>
            </div>
          </div>

      </el-container>
    </el-container>

    <el-container style="width: 100%; height: 200px;
    display: flex; flex-direction: column;
    justify-content: center; align-items: center" >
      <label style="font-weight: 600; line-height: 80px; color: white">We stand with everyone fighting on the frontline.</label>
      <label style="font-size: 14px">Designed by Team-2021041632</label>
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
  name: 'Predict',
  components: {
    Header,
    ThemeSwitch,
    apexchart: VueApexCharts
  },
  data () {
    return {
      country: 'Australia', // 目前搜索栏的国家
      countryOptions: ['Australia', 'Brazil', 'Canada', 'France'], // 国家列表
      init1: true,
      show1: false,
      searchDistrict: '',
      modelAllData: [],
      modelDateList: [],
      modelConfirmedList: [],
      modelFatalList: [],
      modelInfectedList: [],
      modelRecoveredList: [],
      // suggestions
      suggestionAllData: [],
      suggestionDateList: [],
      suggestionGroupList: [],
      suggestionName: '',
      suggestionWords: '',
      // last 7 list
      last7dateList: [],
      last7ConfirmedList: [],
      last7FatalList: [],
      last7InfectedList: [],
      last7RecoveredList: [],
      // last 7 amount
      last7ConfirmedAmount: 0,
      last7FatalAmount: 0,
      last7InfectedAmount: 0,
      last7RecoveredAmount: 0,
      // yesterday added
      addedConfirmedAmount: 0,
      addedFatalAmount: 0,
      addedInfectedAmount: 0,
      addedRecoveredAmount: 0,
      // date and picker
      dateSelected: null,
      datePickerOptions: {
        disabledDate (time) {
          const date1 = new Date('2020-04-01')
          const date2 = new Date('2021-07-01')
          return time.getTime() < date1 || time.getTime() > date2
        }
      },
      series2: [{
        name: 'Confirmed',
        type: 'column',
        data: []
      }, {
        name: 'Fatal',
        type: 'line',
        data: []
      }, {
        name: 'Infected',
        type: 'line',
        data: []
      }, {
        name: 'Recovered',
        type: 'line',
        data: []
      }],
      chartOptions2: {
        colors: ['#c6322e', '#8f8f94', '#5672a0', '#93b379'],
        chart: {
          height: 350,
          type: 'line',
          stacked: false
        },
        stroke: {
          width: [2, 2, 2, 2],
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
          column: {
            colors: undefined,
            opacity: 0.5
          }
        },
        fill: {
          opacity: [0.25, 0.25, 0.6, 0.6],
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: 'vertical',
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
          }
        },
        labels: [],
        markers: {
          size: 0.5
        },
        xaxis: {
          type: 'datetime',
          labels: {
            style: {
              colors: ['rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)',
                'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)',
                'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)',
                'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)',
                'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)',
                'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)']
            }
          }
        },
        yaxis: {
          text: 'Points',
          labels: {
            minWidth: 40,
            style: {
              colors: ['rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)']
            }
          }
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
      },

      // sync chart
      seriesLine1: [{
        name: 'Confirmed',
        data: []
      }],
      chartOptionsLine1: {
        chart: {
          type: 'line',
          height: 200,
          group: 'hi'
        },
        colors: ['#c6322e'],
        title: {
          text: 'Confirmed',
          align: 'left',
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: '-apple-system',
            color: '#c6322e'
          }
        },
        tooltip: {
          theme: 'dark'
        },
        stroke: {
          width: [2],
          curve: 'smooth'
        },
        plotOptions: {
          bar: {
            columnWidth: '20%'
          }
        },
        xaxis: {
          labels: {
            style: {
              colors: ['rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)']
            }
          }
        },
        yaxis: {
          labels: {
            minWidth: 40,
            style: {
              colors: ['rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)']
            }
          }
        }
      },

      seriesLine2: [{
        data: [],
        name: 'Fatal'
      }],
      chartOptionsLine2: {
        chart: {
          type: 'line',
          height: 200,
          group: 'hi'
        },
        colors: ['#9d9c9e'],
        title: {
          text: 'Fatal',
          align: 'left',
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: '-apple-system',
            color: '#9d9c9e'
          }
        },
        stroke: {
          width: [2],
          curve: 'smooth'
        },
        plotOptions: {
          bar: {
            columnWidth: '20%'
          }
        },
        tooltip: {
          theme: 'dark'
        },
        xaxis: {
          labels: {
            style: {
              colors: ['rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)']
            }
          }
        },
        yaxis: {
          labels: {
            minWidth: 40,
            style: {
              colors: ['rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)']
            }
          }
        }
      },

      seriesLine3: [{
        data: [],
        name: 'Infected'
      }],
      chartOptionsLine3: {
        chart: {
          type: 'line',
          height: 200,
          group: 'hi'
        },
        colors: ['#5672a0'],
        title: {
          text: 'Infected',
          align: 'left',
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: '-apple-system',
            color: 'rgb(86,114,160)'
          }
        },
        stroke: {
          width: [2],
          curve: 'smooth',
          color: '#f0f3f5'
        },
        plotOptions: {
          bar: {
            columnWidth: '20%'
          }
        },
        tooltip: {
          theme: 'dark'
        },
        xaxis: {
          labels: {
            style: {
              colors: ['rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)']
            }
          }
        },
        yaxis: {
          labels: {
            minWidth: 40,
            style: {
              colors: ['rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)']
            }
          }
        }
      },

      seriesLine4: [{
        data: [],
        name: 'Recovered'
      }],
      chartOptionsLine4: {
        chart: {
          type: 'line',
          height: 200,
          group: 'hi'
        },
        colors: ['#86a373'],
        title: {
          text: 'Recovered',
          align: 'left',
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: '-apple-system',
            color: 'rgb(134,163,115)'
          }
        },
        stroke: {
          width: [2],
          curve: 'smooth'
        },
        plotOptions: {
          bar: {
            columnWidth: '20%'
          }
        },
        tooltip: {
          theme: 'dark'
        },
        xaxis: {
          labels: {
            style: {
              colors: ['rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)']
            }
          }
        },
        yaxis: {
          labels: {
            minWidth: 40,
            style: {
              colors: ['rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)']
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
      .get('https://www.fastmock.site/mock/5cbbd84514072b77a738b4c90c503231/corona/australia')
      .then(res => {
        this.modelAllData = res.data.data.list
        for (var i = 0; i < this.modelAllData.length; i++) {
          this.modelDateList.push(this.modelAllData[i].Date.toString())
          this.modelConfirmedList.push(this.modelAllData[i].Confirmed)
          this.modelFatalList.push(this.modelAllData[i].Fatal)
          this.modelInfectedList.push(this.modelAllData[i].Infected)
          this.modelRecoveredList.push(this.modelAllData[i].Recovered)
        }
      })
      .catch(error => {
        console.log('There is an error: ' + error.response)
        // eslint-disable-next-line no-sequences
      })
    axios
      .get('https://www.fastmock.site/mock/5cbbd84514072b77a738b4c90c503231/corona/trend/Australia')
      .then(res => {
        this.suggestionAllData = res.data.data.list
        for (var i = 0; i < this.suggestionAllData.length; i++) {
          this.suggestionDateList.push(this.suggestionAllData[i].Date.toString())
          this.suggestionGroupList.push(this.suggestionAllData[i].Australia)
          // console.log(this.suggestionAllData[i].Australia)
        }
      })
      .catch(error => {
        console.log('There is an error: ' + error.response)
        // eslint-disable-next-line no-sequences
      })
    // this.dateSelected = new Date('2021-07-01')
    // console.log(this.suggestionAllData)
    // this.selectNewDate()
    // this.init1 = false
  },
  computed: {
    isDarkMode () {
      return store1.getters.getIsDarkMode
    }
  },
  methods: {
    getSelectedDateIndex (selected1) {
      console.log(selected1)
      const temp = selected1.substr(1, 10)
      return this.modelDateList.indexOf(temp)
    },
    getSelectedDateIndexInSuggestion (selected1) {
      console.log(selected1)
      const temp = selected1.substr(1, 10)
      return this.suggestionDateList.indexOf(temp)
    },
    getListAndAmount (index11) {
      for (var i = index11; i < index11 + 7; i++) {
        // date
        const date11 = this.modelDateList[i].substr(0, 10)
        this.last7dateList.push(date11)
        // confirmed
        const confirmed11 = parseInt(this.modelConfirmedList[i])
        this.last7ConfirmedList.push(confirmed11)
        this.last7ConfirmedAmount = Number(this.last7ConfirmedAmount) + Number(confirmed11)
        // fatal
        const fatal11 = parseInt(this.modelFatalList[i])
        this.last7FatalList.push(fatal11)
        this.last7FatalAmount = Number(this.last7FatalAmount) + Number(fatal11)
        // infected
        const infected11 = this.modelInfectedList[i]
        this.last7InfectedList.push(infected11)
        this.last7InfectedAmount += parseInt(infected11)
        // recovered
        const recovered11 = this.modelRecoveredList[i]
        this.last7RecoveredList.push(recovered11)
        this.last7RecoveredAmount += parseInt(recovered11)
      }
    },
    selectNewCountry () {
      const url1 = 'https://www.fastmock.site/mock/5cbbd84514072b77a738b4c90c503231/corona/' + this.country
      const url11 = encodeURI(url1)
      this.modelDateList = []
      this.modelConfirmedList = []
      this.modelFatalList = []
      this.modelInfectedList = []
      this.modelRecoveredList = []
      this.selectNewCountry1()
      // this.init1 = true
      console.log(url11)
      axios.get(url11)
        .then(res => {
          this.modelAllData = res.data.data.list
          console.log(this.modelAllData)
          for (var i = 0; i < this.modelAllData.length; i++) {
            this.modelDateList.push(this.modelAllData[i].Date.toString())
            this.modelConfirmedList.push(this.modelAllData[i].Confirmed)
            this.modelFatalList.push(this.modelAllData[i].Fatal)
            this.modelInfectedList.push(this.modelAllData[i].Infected)
            this.modelRecoveredList.push(this.modelAllData[i].Recovered)
          }
          this.dateSelected = ''
          this.selectNewDate()
          this.init1 = false
        })
        .catch(error => {
          console.log('There is an error: ' + error.response)
        })
    },
    selectNewCountry1 () {
      console.log('get new suggestion')
      const url1 = 'https://www.fastmock.site/mock/5cbbd84514072b77a738b4c90c503231/corona/trend/' + this.country
      const url11 = encodeURI(url1)

      this.suggestionAllData = []
      this.suggestionDateList = []
      this.suggestionGroupList = []
      // this.init1 = true
      console.log(url11)
      axios.get(url11)
        .then(res => {
          this.suggestionAllData = res.data.data.list
          if (this.country === 'Australia') {
            for (var i = 0; i < this.suggestionAllData.length; i++) {
              this.suggestionDateList.push(this.suggestionAllData[i].Date.toString())
              this.suggestionGroupList.push(this.suggestionAllData[i].Australia)
              // console.log(this.suggestionAllData[i].Australia)
            }
          } else if (this.country === 'Brazil') {
            for (var i2 = 0; i2 < this.suggestionAllData.length; i2++) {
              this.suggestionDateList.push(this.suggestionAllData[i2].Date.toString())
              this.suggestionGroupList.push(this.suggestionAllData[i2].Brazil)
              // console.log(this.suggestionAllData[i].Australia)
            }
          } else if (this.country === 'Canada') {
            for (var i3 = 0; i3 < this.suggestionAllData.length; i3++) {
              this.suggestionDateList.push(this.suggestionAllData[i3].Date.toString())
              this.suggestionGroupList.push(this.suggestionAllData[i3].Canada)
              // console.log(this.suggestionAllData[i].Australia)
            }
          } else if (this.country === 'France') {
            for (var i4 = 0; i4 < this.suggestionAllData.length; i4++) {
              this.suggestionDateList.push(this.suggestionAllData[i4].Date.toString())
              this.suggestionGroupList.push(this.suggestionAllData[i4].France)
              // console.log(this.suggestionAllData[i].Australia)
            }
          } else if (this.country === 'Iceland') {
            for (var i5 = 0; i < this.suggestionAllData.length; i5++) {
              this.suggestionDateList.push(this.suggestionAllData[i5].Date.toString())
              this.suggestionGroupList.push(this.suggestionAllData[i5].Iceland)
              console.log(this.suggestionAllData[i5].Iceland)
            }
          } else if (this.country === 'India') {
            for (var i6 = 0; i < this.suggestionAllData.length; i6++) {
              this.suggestionDateList.push(this.suggestionAllData[i6].Date.toString())
              this.suggestionGroupList.push(this.suggestionAllData[i6].India)
              // console.log(this.suggestionAllData[i].Australia)
            }
          } else if (this.country === 'Poland') {
            for (var i7 = 0; i < this.suggestionAllData.length; i7++) {
              this.suggestionDateList.push(this.suggestionAllData[i7].Date.toString())
              this.suggestionGroupList.push(this.suggestionAllData[i7].Poland)
              // console.log(this.suggestionAllData[i].Australia)
            }
          }
        })
        .catch(error => {
          console.log('There is an error: ' + error.response)
        })
    },
    selectNewDate () { // 选择新日期
      var index1 = 0
      var suggestIndex = 0
      if (this.init1 === true) {
        index1 = this.getSelectedDateIndex('"2021-07-01"')
        suggestIndex = this.getSelectedDateIndexInSuggestion('"2021-07-01"')
      } else {
        index1 = this.getSelectedDateIndex(this.dateSelected.toString()) // 起始日期的索引
        suggestIndex = this.getSelectedDateIndexInSuggestion(this.dateSelected.toString())
      }
      console.log('增长率：', this.suggestionGroupList[suggestIndex])
      // get suggestion
      if (Number(this.suggestionGroupList[suggestIndex]) > 1) {
        this.suggestionName = 'LOCKDOWN'
        this.suggestionWords = 'For the day to be analyzed,' +
          'the prevalence in your chosen region is still on the increase ' +
          'and in the outbreak phase. ' +
          'Therefore, we strongly recommend measures to be taken to block ' +
          'the area in order to control the outbreak and reduce the exponential ' +
          'spread of the epidemic.'
        // eslint-disable-next-line eqeqeq
      } else if (Number(this.suggestionGroupList[suggestIndex]) == 1) {
        this.suggestionName = 'VACCINE'
        this.suggestionWords = 'For the day to be analyzed, ' +
          'the prevalence in your chosen region is static. ' +
          'Therefore, we strongly recommend measures to be taken to take vaccine ' +
          'in order to slow down the trend and reduce the exponential ' +
          'spread of the epidemic.'
      } else {
        this.suggestionName = 'MEDICINE'
        this.suggestionWords = 'For the day to be analyzed, ' +
          'the prevalence in your chosen region gets controlled. ' +
          'Therefore, we strongly recommend measures to be taken to use medicine to cure and protect your people ' +
          'in order to reduce the chances of more people getting infected.'
      }
      // last 7 list
      this.last7dateList = []
      this.last7ConfirmedList = []
      this.last7FatalList = []
      this.last7InfectedList = []
      this.last7RecoveredList = []
      // last 7 amount
      this.last7ConfirmedAmount = 0
      this.last7FatalAmount = 0
      this.last7InfectedAmount = 0
      this.last7RecoveredAmount = 0
      // yesterday added
      this.addedConfirmedAmount = this.modelConfirmedList[index1 + 6]
      this.addedFatalAmount = this.modelFatalList[index1 + 6]
      this.addedInfectedAmount = this.modelInfectedList[index1 + 6]
      this.addedRecoveredAmount = this.modelRecoveredList[index1 + 6]
      // call the func
      this.getListAndAmount(index1)
      // table
      this.series2 = [{
        name: 'Confirmed',
        type: 'line',
        data: this.last7ConfirmedList
      }, {
        name: 'Fatal',
        type: 'line',
        data: this.last7FatalList
      }, {
        name: 'Infected',
        type: 'line',
        data: this.last7InfectedList
      }, {
        name: 'Recovered',
        type: 'line',
        data: this.last7RecoveredList
      }]
      this.chartOptions2 = {
        colors: ['#c6322e', '#9d9c9e', '#5672a0', '#93b379'],
        chart: {
          height: 350,
          type: 'line',
          stacked: false
        },
        stroke: {
          width: [2, 2, 2, 2],
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
          column: {
            colors: undefined,
            opacity: 0.5
          }
        },
        fill: {
          opacity: [1, 1, 1, 1],
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: 'vertical',
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
          }
        },
        labels: this.last7dateList,
        markers: {
          size: 0.5
        },
        xaxis: {
          type: 'datetime',
          labels: {
            style: {
              colors: ['rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)',
                'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)',
                'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)',
                'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)',
                'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)',
                'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)']
            }
          }
        },
        yaxis: {
          text: '',
          labels: {
            minWidth: 40,
            style: {
              colors: ['rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)']
            }
          }
        },
        tooltip: {
          theme: 'dark',
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== 'undefined') {
                return y.toFixed(0) + ' people'
              }
              return y
            }
          }
        }
      }
      // confirmed
      this.seriesLine1 = [{
        data: this.last7ConfirmedList
      }]
      this.chartOptionsLine1 = {
        labels: this.last7dateList,
        chart: {
          type: 'line',
          height: 200
        },
        colors: ['#c6322e'],
        title: {
          text: 'Confirmed',
          align: 'left',
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: '-apple-system',
            color: '#c6322e'
          }
        },
        tooltip: {
          theme: 'dark'
        },
        stroke: {
          width: [2, 2],
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
        xaxis: {
          type: 'datetime',
          labels: {
            style: {
              colors: ['rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)']
            }
          }
        },
        yaxis: {
          labels: {
            minWidth: 40,
            style: {
              colors: ['rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)']
            }
          }
        }
      }
      // fatal
      this.seriesLine2 = [{
        data: this.last7FatalList
      }]
      this.chartOptionsLine2 = {
        labels: this.last7dateList,
        chart: {
          type: 'line',
          height: 200
        },
        colors: ['#9d9c9e'],
        title: {
          text: 'Fatal',
          align: 'left',
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: '-apple-system',
            color: '#9d9c9e'
          }
        },
        stroke: {
          width: [2],
          curve: 'smooth'
        },
        plotOptions: {
          bar: {
            columnWidth: '20%'
          }
        },
        tooltip: {
          theme: 'dark'
        },
        xaxis: {
          type: 'datetime',
          labels: {
            style: {
              colors: ['rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)']
            }
          }
        },
        yaxis: {
          labels: {
            minWidth: 40,
            style: {
              colors: ['rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)']
            }
          }
        }
      }
      // infected
      this.seriesLine3 = [{
        data: this.last7InfectedList
      }]
      this.chartOptionsLine3 = {
        labels: this.last7dateList,
        chart: {
          type: 'line',
          height: 200
        },
        colors: ['#5672a0'],
        title: {
          text: 'Infected',
          align: 'left',
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: '-apple-system',
            color: 'rgb(86,114,160)'
          }
        },
        stroke: {
          width: [2],
          curve: 'smooth',
          color: '#f0f3f5'
        },
        plotOptions: {
          bar: {
            columnWidth: '20%'
          }
        },
        tooltip: {
          theme: 'dark'
        },
        xaxis: {
          type: 'datetime',
          labels: {
            style: {
              colors: ['rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)']
            }
          }
        },
        yaxis: {
          labels: {
            minWidth: 40,
            style: {
              colors: ['rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)']
            }
          }
        }
      }
      this.seriesLine4 = [{
        data: this.last7RecoveredList
      }]
      this.chartOptionsLine4 = {
        labels: this.last7dateList,
        chart: {
          type: 'line',
          height: 200
        },
        colors: ['#86a373'],
        title: {
          text: 'Recovered',
          align: 'left',
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: '-apple-system',
            color: 'rgb(134,163,115)'
          }
        },
        stroke: {
          width: [2],
          curve: 'smooth'
        },
        plotOptions: {
          bar: {
            columnWidth: '20%'
          }
        },
        tooltip: {
          theme: 'dark'
        },
        xaxis: {
          type: 'datetime',
          labels: {
            style: {
              colors: ['rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)']
            }
          }
        },
        yaxis: {
          labels: {
            minWidth: 40,
            style: {
              colors: ['rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)', 'rgba(240,243,245,0.5)']
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/colors.scss";
@import "../assets/typography.scss";

.home{
  width: 100%;
  height: 100vh;
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
  margin-bottom: 0px;
  height: 80px;
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
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
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
