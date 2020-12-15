<script>
import VueCharts from 'vue-chartjs';
import { Bar } from 'vue-chartjs';

export default {
  props: ['labels', 'data', 'options'],
  extends: Bar,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label:"Incompleted Tasks",
          backgroundColor: new Array(11).fill('#fee19a'),
         //   sent as a prop the right data
          data: this.data 
        },
                {
          label:"Completed Tasks",
          backgroundColor: new Array(11).fill('#ffb032'),
        //   send as a prop the right data
          data: [7,5,3,4,5]
        }
                 ],
               
             },
     this.options)
  }
}

</script>