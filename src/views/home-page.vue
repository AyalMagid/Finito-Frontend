<template>
  <section class="home-page">
    <div class="recent-boards-container">
      <h4 class="catagory-label">
        <i class="fas fa-chalkboard"></i>
        Your Boards
      </h4>
      <div class="recent-boards">
        <board-preview
          :isLink="true"
          v-for="board in boards"
          :board="board"
          :key="board._id"
        />
        <div
          @click="showModal = !showModal"
          class="board-preview flex create-board"
        >
          Create New Board
        </div>
      </div>
    </div>
    <modal @close="showModal = !showModal" v-if="showModal">
      <div class="create-board-container">
        <board-preview :previewUrl="boardImgPreivewUrl" :board="newBoard" />
        <div class="create-board-input">
          <form-input
            v-model="newBoard.name"
            :showLabel="true"
            labelText="Board Title"
          />
        </div>
        <div class="create-board-colors">
          <h4>Choose Color</h4>
          <color-small @colorClicked="changeBgColor" size="small" />
        </div>
        <div class="create-board-imgs">
          <searchImg
            :saveSettings="{ previewSize: 'regular', saveSize: 'full' }"
            :getAllSizes="true"
            :topImages="topImages"
            @imageChoosen="setBoardImg"
          />
        </div>

        <button @click="addNewBoard" class="btn-primary">Create</button>
      </div>
    </modal>

    <div class="board-templates-container">
      <h4 class="catagory-label">
        <i class="fas fa-photo-video"></i> Templates
      </h4>
      <div class="board-templates">
        <board-template
          v-for="(template, index) in templates"
          :template="template"
          :key="index"
          @showTemplate="showTemplate"
        />
      </div>
      <transition name="fade">
        <modal
          @close="showTemplateModal = !showTemplateModal"
          v-if="showTemplateModal"
        >
          <div class="template-details-container">
            <div class="template-img-container">
              <img
                class="template-preview-img"
                :src="
                  require(`@/assets/images/TempsPreview/${this.selectedTemplate.imgLink}`)
                "
              />
            </div>
            <div class="templdate-content-container">
              <h4 class="catagory-label">{{this.selectedTemplate.name}}</h4>
              <p>
                Pre made with all the necessary lists to get you started right
                away
              </p>
              <h4 class="catagory-label">Template Features</h4>
              <ul class="clean-list template-features-container">
                <li>
                  <i class="el-icon-edit"></i>
                  <span>Fully customizable</span>
                </li>
                <li>
                  <i class="el-icon-data-analysis"></i>
                  <span>Supports tasks analysis</span>
                </li>
                <li>
                  <i class="el-icon-picture-outline"></i>
                  <span>Supports background images</span>
                </li>
                <li>
                  <i class="fas fa-palette"></i>
                  <span>Supports background colors</span>
                </li>
                <li>
                  <i class="el-icon-paperclip"></i>
                  <span>Supports file uploads</span>
                </li>
                <li>
                  <i class="fas fa-sync"></i>
                  <span>Supports live synchronization</span>
                </li>
              </ul>
              <button @click="createTemplate" class="btn-primary full-width">
                Generate Template
              </button>
              <p @click="showTemplateModal = !showTemplateModal">
                Back to Homepage
              </p>
            </div>
          </div>
        </modal>
      </transition>
    </div>
  </section>
</template>

<script>
import { boardService } from "../services/board-service.js";
import { UnsplashService } from "../services/unsplashImage-service";
import { utilService } from "../utils/utils";
import boardPreview from "../components/board-preview.cmp.vue";
import boardTemplate from "../components/UIComponents/template";
import formInput from "../components/FormElements/form-input.cmp";
import searchImg from "../components/UIComponents/search-img";
import modal from "../components/UIComponents/modal";
import colorSmall from "../components/UIComponents/color-small";
import boardPreviewCmpVue from "../components/board-preview.cmp.vue";
export default {
  name: "home-page",
  components: {
    boardPreview,
    boardTemplate,
    formInput,
    modal,
    colorSmall,
    searchImg,
  },
  data() {
    return {
      boards: null,
      users: null,
      showModal: false,
      showTemplateModal: false,
      selectedBgImgs: null,
      templatePreviewImg: "",
      selectedTemplate: null,
      templates: [
        {
          name: "Project Managment",
          previewImg:
            "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE0OTc5MX0",
          desc:
            "All of the Lists you need to work on your project right in one place right for you",
          imgLink: "company-overview-template.jpeg",
        },
        {
          _id: "5f25bc17c8b7690017df331e",
          name: "Marketing",
          previewImg:
            "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
          desc:
            "From Digital marketing to traditonial marketing,everything list is ready for you",
          imgLink: "Marketing-Temp-Preview.png",
        },
        {
          _id:"5f25e290981b6d0017b18804",
          name: "Engineering",
          previewImg:
            "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
          desc:
            "List are premade to save you the effort on making them. Go and start coding!",
          imgLink: "company-overview-template.jpeg",
        },

        {
          _id:"5f25e4d3981b6d0017b18805",
          name: "Design",
          previewImg:
            "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
          desc:
            "All of the lists and tasks are premade so you can focus on being creative",
          imgLink: "company-overview-template.jpeg",
        },
        {
          _id:"5f25e723981b6d0017b18806",
          name: "Buisness",
          previewImg:
            "https://images.unsplash.com/photo-1491336477066-31156b5e4f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
          desc:
            "There are a lot of tasks and list to create for business that's why we premade them for you",
          imgLink: "buissness-template-img.jpg",
        },
      ],
      newBoard: {
        name: "",
        members: [],
        style: {
          bgUrl: "",
          bgColor: "",
          previewUrl:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE0OTc5MX0",
        },
      },
      boardImgPreivewUrl:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80 750w",
      boardSaveUrls: [
        {
          full:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0OTc5MX0",
        },
        {
          small:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0OTc5MX0",
        },
        {
          regular:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE0OTc5MX0",
        },
      ],
      topImages: [],
    };
  },
  async created() {
    this.boards = await this.$store.dispatch({
      type: "loadBoards",
      byUser: this.loggedUser._id,
    });
    this.users = await this.$store.dispatch({ type: "loadUsers" });
    this.topImages = await UnsplashService.getRandomPhotos("9", "landscape");
  },
  methods: {
    async addNewBoard() {
      if (!this.newBoard.name) return;
      let createdBoard = boardService.getEmptyBoard();
      createdBoard.name = this.newBoard.name;
      createdBoard.creator = this.$store.getters.loggedUser._id || "Guest";
      createdBoard.style = this.newBoard.style;
      createdBoard.style.bgUrls = this.boardSaveUrls;
      createdBoard.members = this.newBoard.members.map((member) =>
        this.users.find((user) => user._id === member)
      );
      createdBoard = await this.$store.dispatch({
        type: "saveBoard",
        board: createdBoard,
      });

      this.$router.push(`/board/${createdBoard._id}`);
    },
    changeBgColor({ color }, _) {
      this.newBoard.style.bgUrl = "";
      this.newBoard.style.previewUrl = "";
      this.boardImgPreivewUrl = "";
      this.newBoard.style.bgColor = color;
      this.boardSaveUrls = [];
    },
    setBoardImg({ small, regular, full, thumbnail }) {
      if (this.boardSaveUrls.length) {
        this.boardSaveUrls = [];
      }
      this.boardSaveUrls.push({ small, regular, full });
      this.newBoard.style.previewUrl = small;
      this.boardImgPreivewUrl = small;
    },
    async createTemplate() {
      let newBoard = await this.$store.dispatch({
        type: "getBoardById",
        id: this.selectedTemplate._id,
      });
      delete newBoard._id;
      newBoard.activities=[]
      newBoard.creator = this.$store.getters.loggedUser._id || "Guest";
      await this.$store.dispatch({
        type: "saveBoard",
        board: newBoard,
      });
      this.showTemplateModal = false;
    },
    showTemplate(template) {
      this.selectedTemplate = template;
      this.showTemplateModal = true;
    },
  },
  computed: {
    loggedUser() {
      return this.$store.getters.loggedUser;
    },
  },
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
