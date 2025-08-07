<template>
  <v-container>
    <v-card>
      <v-card-title>
        User Management
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn small @click="openUpdateDialog(item)">Update</v-btn>
        </template>
      </v-data-table>
    </v-card>

    <UserUpdateDialog
      :user="selectedUser"
      v-model="updateDialog"
      @user-updated="fetchUsers"
    />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UserUpdateDialog from './UserUpdateDialog.vue';
// import { getUsers } from '../../../services/admin-home'; // Assuming a getUsers function exists

const search = ref('');
const users = ref([]);
const headers = [
  { title: 'Associate ID', value: 'associateId' },
  { title: 'First Name', value: 'firstName' },
  { title: 'Last Name', value: 'lastName' },
  { title: 'Tech Stack', value: 'techStack' },
  { title: 'Project Role', value: 'projectRole' },
  { title: 'System Role', value: 'systemRole' },
  { title: 'Actions', value: 'actions', sortable: false },
];
const updateDialog = ref(false);
const selectedUser = ref(null);

const fetchUsers = async () => {
  // users.value = await getUsers(); // Replace with actual API call
};

const openUpdateDialog = (user) => {
  selectedUser.value = { ...user };
  updateDialog.value = true;
};

onMounted(fetchUsers);
</script>
