<template>
  <v-container>
    <v-card>
      <v-card-title>Upload Questions</v-card-title>
      <v-card-text>
        <v-form>
          <v-select
            label="Technology/Framework"
            v-model="selectedTechnology"
            :items="technologies"
          ></v-select>
          <v-file-input
            label="Upload .xlsx file"
            accept=".xlsx"
            v-model="questionFile"
            :disabled="!selectedTechnology"
          ></v-file-input>
          <v-btn color="primary" @click="uploadFile" :disabled="!questionFile">Upload</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card class="mt-4">
      <v-card-title>Uploaded Files</v-card-title>
      <v-data-table
        :headers="uploadedFilesHeaders"
        :items="uploadedFiles"
      >
        <template v-slot:item.fileName="{ item }">
          <a @click="downloadFile(item.id)">{{ item.fileName }}</a>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon @click="openDeleteDialog(item.id)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title>Confirm Deletion</v-card-title>
        <v-card-text>Are you sure you want to delete this file?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="red" text @click="confirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { uploadFile as upload, getUploadedFiles, downloadUploadedFile, deleteUploadedFile } from '../../../services/admin-home';

const selectedTechnology = ref(null);
const technologies = ref([/* ... technologies ... */]);
const questionFile = ref(null);
const uploadedFiles = ref([]);
const uploadedFilesHeaders = [
  { title: 'Technology', value: 'technology' },
  { title: 'File Name', value: 'fileName' },
  { title: 'Uploaded By', value: 'uploadedBy' },
  { title: 'Uploaded Timestamp', value: 'timestamp' },
  { title: 'Actions', value: 'actions', sortable: false },
];
const deleteDialog = ref(false);
const fileToDelete = ref(null);

const uploadFile = async () => {
  const formData = new FormData();
  formData.append('file', questionFile.value);
  formData.append('technology', selectedTechnology.value);
  await upload(formData);
  fetchUploadedFiles();
};

const fetchUploadedFiles = async () => {
  uploadedFiles.value = await getUploadedFiles();
};

const downloadFile = async (fileId) => {
  const response = await downloadUploadedFile(fileId);
  // Trigger file download
};

const openDeleteDialog = (fileId) => {
  fileToDelete.value = fileId;
  deleteDialog.value = true;
};

const confirmDelete = async () => {
  await deleteUploadedFile(fileToDelete.value);
  deleteDialog.value = false;
  fetchUploadedFiles();
};

onMounted(fetchUploadedFiles);
</script>
