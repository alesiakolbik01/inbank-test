import Header from '../Header.vue';
import ProfileUserDataForm from '../ProfileUserDataForm.vue';
import FormMonthlyPayment from '../FormMonthlyPayment.vue';
import FormUserAddress from '../FormUserAddress.vue';
import BlockSeparator from '../BlockSeparator.vue';
import FoldingBlockOnCheckboxClick from '../FoldingBlockOnCheckboxClick.vue';
import FormPEP from '../FormPEP.vue';
import FormBeneficialOwner from '../FormBeneficialOwner.vue'; 
import InfoPopup from '../InfoPopup.vue';
import MainLogo from '../icons/mainLogo.vue';
import BurgerMenuIcon from '../icons/BurgerMenuIcon.vue';

const components = [
    {component: Header, name: "Header"},
    {component: ProfileUserDataForm, name: "ProfileUserDataForm"},
    {component: FormMonthlyPayment, name: "FormMonthlyPayment"},
    {component: FormUserAddress, name: "FormUserAddress"},
    {component: BlockSeparator, name: "BlockSeparator"}, 
    {component: FoldingBlockOnCheckboxClick, name: "FoldingBlockOnCheckboxClick"},
    {component: FormPEP, name: "FormPEP"},
    {component: FormBeneficialOwner, name: "FormBeneficialOwner"},
    {component: InfoPopup, name: "InfoPopup"},
    {component: MainLogo, name: "MainLogo"},
    {component: BurgerMenuIcon, name: "BurgerMenuIcon"},
]


export default {
    install (app) {
        components.forEach(({name, component}) => {
            app.component(name, component);
        })
    }
}