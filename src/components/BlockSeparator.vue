<template>
    <div class="separator">
      <div class="separator-line"></div>
      <div v-if="text" class="separator-text">{{ text }}</div>
      <div class="separator-line"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      text: String,
    },
  };
  </script>
  
  <style scoped>
  .separator {
    display: flex;
    align-items: center;
    width: 586px;
    margin: auto;
  }
  
  .separator-line {
    flex-grow: 1;
    height: 1px;
    background: #E9E9E9;
  }
  
  .separator-text {
    color: #DEDEDE;
    font-family: Open Sans;
    font-size: 14px;
    font-style: italic;
    font-weight: 400;
    line-height: 20px; 
    margin: 0 100px;
  }
  
  .separator-text-placeholder {
    flex-grow: 1;
  }

  @media screen and (max-width:1024px){
    .separator {
        width: 60%;
    }
  }
  </style>
  