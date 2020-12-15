<template>
  <section class="dashboard" v-if="board">
    <div class="charts-container flex col">
      <div class="linechart-container chart">
        <div class="linechart-header flex space-between">
    <!--  make it tasks completion over time - how many completed each month-->
       <h2>Board Progress </h2> 
       <el-select  @input="updateLineChart" v-model="monthToStartFrom" placeholder="Show From...">
            <el-option v-for="(month, idx) in selectOptions" :key="idx" :label="month.label" :value="month.value"></el-option>
      </el-select>
      </div>
       <!--  Tasks Completion Per Month since created by PREC%-->
        <line-chart :chart-data="datacollection" :options="options"/>
      </div>
    <div class="doughnut-barchart-wraper flex">
     <div class="doughnut-container chart">
      <h3>TaskGroup Popularity</h3>
        <doughnut-chart  :labels="taskGroupsTitles" :data="numOfTasksInGroup"/>
     </div>
      <div class="barchart-container chart">
    <!--  make it complete and incomlete tasks per member -->
       <h3>Members Progress</h3>
        <bar-chart :labels="boardMembersNames" :data="tasksNumPerMember" :options="options"/>
      </div>
     </div>
   </div>
  </section>
</template>

<script>
// MAKE:
// tasks per board members

import doughnutChart from '@/components/doughnut-chart.vue'
import barChart from '@/components/bar-chart.cmp.vue'
import lineChart from '@/components/line-chart.cmp.vue'
export default {
  name: "dashboard",
    data () {
      return {
              gradient: null,
          datacollection: {},
          months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          monthToStartFrom: '',
          options: {
          responsive: true,
          maintainAspectRatio: false,
           scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
          }
        },
        selectOptions: [{
          value: 1,
          label: 'Jan'
        }, {
          value: 2,
          label: 'Feb'
        }, {
          value: 3,
          label: 'Mar'
        }, {
          value: 4,
          label: 'Apr'
        }, {
          value: 5,
          label: 'May'
        }, {
          value: 6,
          label: 'Jun'
        }, {
          value: 7,
          label: 'Jul'
        }, {
          value: 8,
          label: 'Aug'
        }, {
          value: 9,
          label: 'Sep'
        }, {
          value: 10,
          label: 'Oct'
        },{
          value: 11,
          label: 'Nov'
        },{
          value: 12,
          label: 'Dec'
        }]
    }
    },
    computed: {
    monthsToShow(){
      const monthsForward = []
      // make if full year since this month - shows 12 month backward
      if (!this.monthToStartFrom) {this.monthToStartFrom = (new Date(Date.now()).getMonth())+1}
      console.log(this.monthToStartFrom)
      var currMonth = this.monthToStartFrom-1
      for (var i=0; i<12; i++) {
        monthsForward.push(this.months[currMonth])
        currMonth++
        if (currMonth+1===this.monthToStartFrom) break
        if (currMonth===12) {
          currMonth = 0
          }
        }
      return monthsForward
    },  
    board() {
      return this.$store.getters.board;
    },
    allTasks(){
      return this.board.taskGroups.reduce((acc, tg) => {
        acc = acc.concat(tg.tasks)
        return acc
      },[])
    },
    // goes threw the relevant months in the arr, and replace them with the number of tasks was completed during that month
    completedTasksPerMonth (){
      return this.monthsToShow.map (month => {
        return this.board.activities.reduce((acc,activity) => {
          const creationMonth = new Date(activity.createdAt).getMonth()
          const monthByWord = this.months[creationMonth-1]
          if ((activity.action === "COMPLETED_TASK") && (month === monthByWord)) {
            console.log(creationMonth)
            acc++
          }         
          return acc
        }, 0)
      })
    },
    taskGroupsTitles(){
      return this.board.taskGroups.map(tg => tg.title)
    },
    numOfTasksInGroup() {
        return this.board.taskGroups.map(tGroup => tGroup.tasks.length)
    },
    boardMembersNames(){
        // change to username (with mongo)
        return this.board.members.map(m => m.username)
    },
       // change to username (with mongo)
    tasksNumPerMember(){
        return this.boardMembersNames.map(memberName => {
            // num ot tasks in total
            return this.board.taskGroups.reduce((higherAcc, tg) => {
                return higherAcc += tg.tasks.reduce((acc, task) => {
                    task.members.forEach (m => {
                        if (m.username === memberName) {
                            acc ++; 
                        }
                    })
                   return acc
                }, 0) 
                return higherAcc
            },0)
        })
    },
    // check if works
    completedMembersTasks(){
        return this.boardMembersNames.map(memberName => {
            return this.allTasks.reduce((acc, task) => {
              task.members.forEach (m => {
               if ((task.isComplete)&& (m.username === memberName))
                  {acc ++}
              })
            return acc
            },0)
         })
      },
    },
      
    inCompletedMembersTasks(){
      return this.tasksNumPerMember.map((memberTasksNum,idx) => {
        memberTasksNum - (this.completedMembersTasks[idx])
      }) 
    },
    mounted(){
      this.updateLineChart()
    },
    methods: {
      updateLineChart () {

        this.datacollection = {
          
          labels: this.monthsToShow,
            datasets: [
                        {
                label: 'All Completed Tasks Over a Year',
                backgroundColor: '#b24773',
                data: this.completedTasksPerMonth,
                 }
               ]
        }
      },
    },
  components:{
      doughnutChart,
      barChart,
      lineChart
  }

};
</script>

