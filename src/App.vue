<template>
  <div class="container">
    <Header />
    <main>
      <FormMonthlyPayment class="mb-4" @change-monthly-payment="setData" />
      <ProfileUserDataForm class="mb-5" @change-monthly-payment="setData" v-model="userData.userContact"/>
      <FormUserAddress @change-monthly-payment="setData" />
      <BlockSeparator />
      <FoldingBlockOnCheckboxClick labelText="Neither I nor my family member is PEP" key="pep" id="pep"
        v-model="userData.isPEP" class="mt-5"
        :infoData="{ title: 'PEP', text: 'Velit enim laborum officia eu consequat mollit ipsum tempor nostrud labore non.' }">
        <FormPEP @change-monthly-payment="setData" formType="pepForm"/>
      </FoldingBlockOnCheckboxClick>
      <FoldingBlockOnCheckboxClick labelText="I’m the ultimate beneficiary" key="beneficiary" id="beneficiary"
        v-model="userData.isBeneficiary" class="mt-5"
        :infoData="{ title: 'Beneficial Owner', text: 'Velit enim laborum officia eu consequat mollit ipsum tempor nostrud labore non.' }">
        <FormBeneficialOwner @change-monthly-payment="setData">
          <FoldingBlockOnCheckboxClick labelText="The beneficial owner is not a PEP" key="beneficiaryNotPep"
            id="beneficiaryNotPep" v-model="userData.isBeneficiaryNotPep" class="mt-5">
            <FormPEP @change-monthly-payment="setData" formType="beneficiaryNotPepData"/>
          </FoldingBlockOnCheckboxClick>
        </FormBeneficialOwner>
      </FoldingBlockOnCheckboxClick>
      <div class="d-flex justify-content-center mt-5 mb-5">
        <button class="btn-submit-form" @click="sendForm">Continue</button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        isPEP: true,
        isBeneficiary: true,
        isBeneficiaryNotPep: true,
        userContact: {
          phone: "",
          email: "",
          id: "",
          fullname: ""
        },
        pepForm: {
          relationshipPEP: "",
          regionPEP: "",
          positionPEP: "",
          durationOrRelated: ""
        },
        beneficiary: {
          firstName: "",
          lastName: "",
          personalID: "",
          residency: "",
          birthPlace: "",
          birthDate: "",
        },
        beneficiaryNotPepData: {
          relationshipPEP: "",
          regionPEP: "",
          positionPEP: "",
          durationOrRelated: ""
        }
      }
    }
  },
  methods: {
    sendForm() {
      //TODO: here should be implemented a post request 
      console.log(this.userData)
    },
    setData(data) {
      this.userData = { ...this.userData, ...data }
    }
  },
  created() {
    fetch('/data/user-contact.json')
      .then((response) => response.json())
      .then((data) => {
        this.userData.userContact = data.userContact;
      });
  }
}
</script>

<style scoped>
.btn-submit-form {
  width: 372px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #2B0A57;
  text-align: center;
  font-family: Open Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  color: #FDFDFD;
}
</style>
