<template>
  <h6>Personal data</h6>
  <form @change.prevent="onChangeForm" class="container mt-5 custom-form p-0">
    <div class="row g-3">
      <div class="col-md-6">
        <div class="form-group position-relative">
          <input type="text" id="country" v-model="formData.country" class="form-control redonly-field" :disabled="true"
            placeholder="Estonia" />
          <label for="country" class="floating-label">Country</label>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group position-relative">
          <select id="county" v-model="formData.county" class="form-select" :class="{selected: formData.county}" :disabled="!toggleFormMode">
            <option value="">County</option>
            <option v-for="region of regions" :value="region.name" :key="region.name">{{ region.name }}</option>
          </select>
          <label v-if="formData.county" for="county" class="floating-label">County</label>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group position-relative">
          <select id="city" v-model="formData.city" class="form-select" :class="{selected: formData.city}" :disabled="!toggleFormMode">
            <option value="">City / Parish</option>
            <option v-for="city of computedCity" :value="city.name" :key="city.name">{{ city.name }}</option>
          </select>
          <label v-if="formData.city" for="city" class="floating-label">City / Parish</label>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group position-relative">
          <select id="village" v-model="formData.village" class="form-select" :class="{selected: formData.village}" :disabled="!toggleFormMode">
            <option value="">Township / Village</option>
            <option v-for="village of computedVillage" :value="village.name" :key="village.name">{{ village.name }}
            </option>
          </select>
          <label v-if="formData.village" for="village" class="floating-label">Township / Village</label>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group position-relative">
          <input type="text" id="street" v-model="formData.street" class="form-control" :class="{selected: formData.street}" placeholder="Street"
            :disabled="!toggleFormMode" />
            <label v-if="formData.street" for="street" class="floating-label">Street</label>
        </div>
      </div>
      <div class="col-md-2">
        <div class="form-group d-flex position-relative">
          <input type="text" id="house" v-model="formData.house" class="form-control" :class="{selected: formData.house}" placeholder="House"
            :disabled="!toggleFormMode" />
            <label v-if="formData.house" for="house" class="floating-label">House</label>
        </div>
      </div>
      <div class="col-md-2">
        <div class="form-group d-flex position-relative">
          <input type="text" id="apartment" v-model="formData.apartment" class="form-control" :class="{selected: formData.apartment}" placeholder="Apartment"
            :disabled="!toggleFormMode" />
            <label v-if="formData.apartment" for="apartment" class="floating-label">Apartment</label>
        </div>
      </div>
      <div class="col-md-2">
        <div class="form-group d-flex position-relative">
          <input type="text" id="postalCode" v-model="formData.postalCode" class="form-control" :class="{selected: formData.postalCode}" placeholder="Postal Code"
            :disabled="!toggleFormMode" />
            <label v-if="formData.postalCode" for="postalCode" class="floating-label">Postal Code</label>
        </div>
      </div>
      <BlockSeparator text="Or" class="mt-4" />
      <div class="form-check form-switch custom-switch d-flex justify-content-center mb-4 mt-4">
        <input v-model="toggleFormMode" class="form-check-input custom-control-input" type="checkbox" role="switch"
          id="flexSwitchCheckChecked">
        <label class="form-check-label custom-control-label ms-2" for="flexSwitchCheckChecked">
          Add address manually
        </label>
      </div>
    </div>
  </form>
</template>

<script>

export default {
  data() {
    return {
      formData: {
        country: 'Estonia',
        city: '',
        street: '',
        county: '',
        village: '',
        house: '',
        apartment: '',
        postalCode: '',
      },
      toggleFormMode: false,
      geoNames: [],
      regions: [],
      cities: [],
      villages: [],
      computedCity: [],
      computedVillage: []
    };
  },
  emits: ["changeMonthlyPayment"], 
  methods: {
    onChangeForm() {
      this.$emit('changeMonthlyPayment', {...this.formData})
    },
    resetValue(field) {
      switch (field) {
        case 'city':
          this.formData.city = '';
          this.computedCity = [];
          break;
        case 'village':
          this.formData.village = '';
          this.computedVillage = [];
          break;
        default:
          this.formData.city = '';
          this.computedCity = [];
          this.formData.village = '';
          this.computedVillage = [];
      }
    },
    sortByName(items) {
      return items.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }
      );
    }
  },
  watch: {
    'formData.county'(newValue) {

      if (!newValue) {
        this.resetValue();
        this.computedCity = this.cities;
      }
      else {
        this.computedCity = this.sortByName(this.cities.filter((city) => city.region === newValue));
      }
    },
    'formData.city'(newValue) {

      if (!newValue) {
        this.resetValue('village');
        this.computedVillage = this.villages;
      }
      else if (newValue && this.formData.county) {
        this.computedVillage = this.sortByName(this.villages.filter((village) => village.city === newValue));
      }
      else {
        this.formData.county = this.cities.find(city => city.name === newValue).region;
      }
    },
    'formData.village'(newValue) {

      if (newValue && (!this.formData.county || !this.formData.city)) {
        const foundVillage = this.villages.find(village => village.name === newValue);

        this.formData.county = foundVillage.region;
        this.formData.city = foundVillage.city;
      }
    }
  },
  created() {
    fetch('/dist/data/geonames.json')
      .then((response) => response.json())
      .then((json) => {
        const geoNames = json[this.formData.country];
        this.geoNames = geoNames;

        const regions = this.sortByName(geoNames.regions.reduce((result, region) => {
          result.push({name: region.name});
          return result;
        }, []
        ));

        this.regions = regions;

        const cities = this.sortByName(geoNames.regions.reduce((result, region) => {
          return result.concat(region.cities.map(city => { return { ...city, region: region.name } }));
        }, []))
        this.cities = cities;
        this.computedCity = cities;

        const villages = this.sortByName(cities.reduce((result, city) => {
          return result.concat(city.villages.map(village => { return { ...village, city: city.name, region: city.region } }));
        }, []));
        this.villages = villages;
        this.computedVillage = villages;

      });
  }
};
</script>

<style scoped>
input.redonly-field,
.form-control:disabled,
.form-select:disabled {
  padding: 12px 18px;
  font-size: 16px;
  color: #9C9C9C;
  background-color: #FDFDFD;
  border-color: #E9E9E9;
}

.form-control:focus,
.form-select:focus {
  box-shadow: none;
  border: 1px solid #2B0A57;
}

.form-select.selected,
 .form-control.selected {
  border-color: #E9E9E9;
}

.floating-label {
  font-size: 14px;
  color: #9C9C9C;
  background-color: #FDFDFD;
  position: absolute;
  top: -12px;
  left: 10px;
  padding: 0 4px;
}

.form-control,
.form-select,
.form-select:active:not(:disabled),
.form-select:active:not(:disabled) {
  padding: 12px 18px;
  font-size: 16px;
  background-color: #FDFDFD;
  color: #413C3C;
  border: 1px solid #2B0A57;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-background-clip: text;
  -webkit-text-fill-color: #9C9C9C;
  transition: background-color 5000s ease-in-out 0s;
  box-shadow: inset 0 0 20px 20px #FDFDFD;
}

.custom-form .row {
  margin-bottom: 14px;
  margin-top: -14px;
}

.form-switch .form-check-input:focus {
  --bs-form-switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
}

.form-check-input:active {
  filter: none;
}

.form-check-input {
  flex-shrink: 0;
  background-color: #9C9C9C;
}

.form-switch .form-check-input {
  width: 31px;
  height: 18px;
  --bs-form-switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
  background-position: -2px center;
  background-size: 22px;
  box-shadow: none;
  border: none;
}

.form-switch .form-check-input:checked {
  background-position: calc(100% + 2px) center;
}


.form-check-input:checked {
  background-color: #53CBA0;
  border: none;
}
</style>
