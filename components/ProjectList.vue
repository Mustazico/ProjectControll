<template>
  <div class="list-wrapper">
    <ListDesc/>
    <hr class="solid">
    <!-- Oppretter et entry for hvert prosjekt i store.projects -->
    <div v-for="project in paginatedProjects" :key="project.id">
      <ProjectEntry :entryData="project" />
    </div> 

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">Next</button>
    </div>

    <div v-if="admin">
      <Modal @close="toggleModal" :modalActive="modalActive">
        <h1>New Project</h1>
        <form @submit.prevent="submitForm">
          <label class="input-label">Project title: </label><br>
          <input type="text" id="title" v-model="formData.title" required class="input-field2"><br>
          <label class="input-label">PO-date: </label><br>
          <input type="date" id="PO" v-model="formData.PO" required class="input-field1"><br>
          <label class="input-label">Scheduled finish: </label><br>
          <input type="date" id="SF" v-model="formData.SF" required class="input-field1"><br>
          <label class="input-label">PEM: </label><br>
          <input type="text" id="PEM" v-model="formData.PEM" required class="input-field2"><br>
          <label class="input-label">Template to copy: </label><br>
          <select v-model="formData.template" required class="input-field1">
            <option v-for="template in templates" :key="template.ID" :value="template.ID"> 
              {{teamStore.getTeamName(template.team) + ": " + template.title }}
            </option>
          </select><br>
          <button type="submit" class="addButton">Create Project</button>
        </form>
        <button class="closeButton" @click="toggleModal">Cancel</button>
      </Modal>
      <button v-if="!modalActive" @click="toggleModal" type="button" class="add-project-button">Add Project</button>
    </div>
  </div>
</template>

<script setup>
import Modal from "@/components/ReusableModal.vue";
import { ref, onMounted, computed, watchEffect } from 'vue';
import { useProjectsStore } from '@/stores/projects';
import { useGatesStore } from '@/stores/gates';
import { v4 as uuid } from 'uuid';
import { useIntervalFn } from '@vueuse/core' // VueUse helper, install it

const store = useProjectsStore();
const gateStore = useGatesStore();
const authStore = useAuthStore();
const stagesStore = useStageStore();
const teamStore = useTeamsStore();

const projects = ref([]);
const index = ref(0);
const templates = ref([])

const currentPage = ref(1);
const projectsPerPage = 25;

const admin = computed(() => authStore.isAdmin());

useIntervalFn(() => {
  console.log("Fetching updated projects")
  fetchProjects() // will call the 'todos' endpoint, just above
}, 120000)

const fetchProjects = () => {
  store.fetchTemplates();
  stagesStore.fetchStages();
  store.fetchProjects();
  projects.value = store.getProjects();
  templates.value = store.getTemplates().filter(x => x.ID != 58);
};

const filteredProjects = computed(() => {
  return projects.value.filter(project => !project.archive);
});

const totalPages = computed(() => Math.ceil(filteredProjects.value.length / projectsPerPage));

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * projectsPerPage;
  const end = start + projectsPerPage;
  return filteredProjects.value.slice().slice(start, end);
});


onMounted(() => {
  fetchProjects();
});

watchEffect(() => {
  projects.value = store.getProjects();
  templates.value = store.getTemplates().filter(x => x.ID != 58);
  stagesStore.getStages();
});

const formData = ref({
  title: '',
  PO: '',
  SF: '',
  PEM: '',
  template: ''
});

const submitForm = () => {
  const projectId = uuid();
  store.addProject(projectId, formData.value.template, formData.value.title, 0, formData.value.SF.toString().replace(/-/g, ''), formData.value.PO.toString().replace(/-/g, ''), true, formData.value.PEM, "comment");
  index.value++;
  stagesStore.fetchStages();
  toggleModal();
};

projects.value = store.getProjects();

const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
</script>


<style scoped>
.list-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.addButton, .closeButton, .add-project-button, .pagination-button {
  background-color: #007BFF;
  color: white;
  cursor: pointer;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  margin: 10px;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
}

.addButton:hover, .closeButton:hover, .add-project-button:hover, .pagination-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.addButton:active, .closeButton:active, .add-project-button:active, .pagination-button:active {
  background-color: #003f7f;
  transform: translateY(0);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button:disabled {
  background-color: #888;
  cursor: not-allowed;
}

.input-field1{
  height: 24px;
  width: 30%;
  font-size: 16px;
  padding: 2px;
}

.input-field2{
  height: 24px;
  width: 50%;
  font-size: 16px;
  padding: 2px;
}

.input-label{
  height: 250px;
}

hr.solid {
  width: 100%;
  border-top: 1px solid grey;
}
</style>
