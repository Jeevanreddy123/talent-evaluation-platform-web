<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>Update User</v-card-title>
      <v-card-text>
        <v-text-field label="Associate ID" :value="user.associateId" readonly disabled></v-text-field>
        <v-text-field label="First Name" :value="user.firstName" readonly disabled></v-text-field>
        <v-text-field label="Last Name" :value="user.lastName" readonly disabled></v-text-field>
        <v-text-field label="Tech Stack" v-model="editableUser.techStack"></v-text-field>
        <v-text-field label="Project Role" v-model="editableUser.projectRole"></v-text-field>
        <v-select
          label="System Role"
          v-model="editableUser.systemRole"
          :items="['Admin', 'Evaluator']"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close">Cancel</v-btn>
        <v-btn color="primary" @click="update">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import { updateUser } from '../../../services/admin-home';

const props = defineProps({ user: Object, modelValue: Boolean });
const emits = defineEmits(['update:modelValue', 'user-updated']);

const dialog = ref(props.modelValue);
const editableUser = ref({ ...props.user });

watch(() => props.modelValue, (val) => {
  dialog.value = val;
  if (val) {
    editableUser.value = { ...props.user };
  }
});

const close = () => {
  emits('update:modelValue', false);
};

const update = async () => {
  const payload = { ...editableUser.value };
  payload.role = payload.systemRole; // Add the 'role' key with the value from 'systemRole'
  delete payload.systemRole; // Remove the 'systemRole' key

  await updateUser(payload);
  emits('user-updated');
  close();
};
</script>
