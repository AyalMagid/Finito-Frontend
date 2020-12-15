<script>
import VueCharts from 'vue-chartjs';
import { Doughnut } from 'vue-chartjs';

export default {
  props: ['labels', 'data'],
  extends: Doughnut,
  data () {
    return {
      options :{
         elements: {
             arc: {
                borderWidth: 0
             }
        }
      }
    }
  },
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: "GitHub Commits",
          // make more colors
          backgroundColor: ['#ff8d73', '#ff5276', '#b24774', '#fee09a', '#f8cb62', '#ffb031'],
          data: this.data
        }
      ],
    }, this.options);
  },
};
</script>