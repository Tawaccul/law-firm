<template>
    <file-pond
      ref="pond"
      name="file"
      label-idle="Перетащите файл или <span class='filepond--label-action'>выберите</span>"
      allow-multiple="false"
      accepted-file-types="image/jpeg, image/png"
      @processfile="handleFileProcess"
      @change="onFileChange"
    />
  </template>
  
  <script>
  import vueFilePond from 'vue-filepond';
  import 'filepond/dist/filepond.min.css';
  import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
  
  // Import plugins
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
  import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
  import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
  
  // Register plugins
  const FilePond = vueFilePond(
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
    FilePondPluginImageExifOrientation
  );
  
  export default {
    name: 'FileUpload',
    components: {
      FilePond
    },
    methods: {
      onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.$emit('file-processed', file);
        }
      },
      handleFileProcess(error, file) {
        if (error) {
          console.error('Ошибка загрузки файла:', error);
          return;
        }
        this.$emit('file-processed', file.serverId);
      }
    }
  };
  </script>
  
  <style scoped>
  .filepond--root {
    width: 100%;
    margin-bottom: 20px;
  }
  </style>
  