import { text, boolean, select, radios } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

// import ExclamationIcon from '@/assets/svg/exclamation-circle.svg'

import PxModal from './PxModal'
// import SiteHeader from '../../organisms/SiteHeader/SiteHeader'
import PxButton from '../../atoms/Button/PxButton'
// import PxPxModalContainer from './PxPxModalContainer'

export default {
  title: 'Blocks/Molecules/Modal',
  component: PxModal,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 600,
    },
  },
}

const positionOptions = {
  Top: 'top',
  Bottom: 'bottom',
  Center: 'center',
}

const ariaRoleOptions = {
  Dialog: 'dialog',
  'Alert Dialog': 'alertdialog',
  Alert: 'alert',
}

export const BasicModal = () => {
  return {
    components: { PxModal, PxButton },
    props: {
      header: {
        default: text('Header Slot', 'This is the header.'),
      },
      body: {
        default: text(
          'Body Slot',
          `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora eius temporibus ratione dignissimos, non minima quod nisi corrupti illum distinctio.`
        ),
      },
      footer: {
        default: text('Footer Slot', 'This is the footer.'),
      },
      showCloseButton: {
        default: boolean('Show Close Button', true),
      },
      narrow: {
        default: boolean('Narrow', false),
      },
      position: {
        default: radios('Position', positionOptions, 'center'),
      },
      clickaway: {
        default: boolean('Clickaway?', true),
      },
      ariaRole: {
        default: select('ARIA Role', ariaRoleOptions, 'dialog'),
      },
      closeModalButtonAriaLabel: {
        default: text('ARIA Label', 'Close Modal'),
      },
    },
    methods: {
      closeModal() {
        this.showModal = false
        action('close-modal')
      },
    },
    data() {
      return {
        showModal: true,
      }
    },
    template: `
      <div>
        <p>
          <px-buton @click="showModal = true">Show Modal</px-buton>
        </p>
        <px-modal
          :show="showModal"
          :narrow="narrow"
          :position="position"
          :show-close-button="showCloseButton"
          :clickaway="clickaway"
          :ariaLabel="closeModalButtonAriaLabel"
          @close-modal="closeModal"
        >
          <h2 slot="header">{{ header }}</h2>
          <div slot="body">
            {{ body }}
          </div>
          <div slot="footer">
            {{ footer }}
          </div>
        </px-modal>
      </div>
    `,
  }
}

export const ScrollingModal = () => {
  return {
    components: { PxModal, PxButton },
    props: {
      header: {
        default: text('Header Slot', 'This is the header.'),
      },
      footer: {
        default: text('Footer Slot', 'This is the footer.'),
      },
      showCloseButton: {
        default: boolean('Show Close Button', true),
      },
      narrow: {
        default: boolean('Narrow', false),
      },
      position: {
        default: select('Position', positionOptions, 'center'),
      },
      clickaway: {
        default: boolean('Clickaway?', true),
      },
      ariaRole: {
        default: select('ARIA Role', ariaRoleOptions, 'dialog'),
      },
    },
    methods: {
      closeModal() {
        console.log('closing')
        this.showModal = false
        action('close-modal')
      },
    },
    data() {
      return {
        showModal: false,
      }
    },
    template: `
      <div>
        <div class="container">
          <template v-for="n in 10">
            <p>
              Orci rutrum proin porttitor viverra ullamcorper amet nostra, lacinia primis cras hac porta morbi consectetur ante, feugiat maecenas in platea dui suscipit. Turpis penatibus fames sociis convallis est curae, molestie parturient sed primis fermentum, facilisis cum maecenas porta posuere. Massa urna nascetur lectus hac id, in cras libero mattis habitant, senectus vivamus ut a. Parturient torquent erat libero faucibus tempor adipiscing suscipit facilisis mauris lacinia natoque, ligula nascetur neque enim fringilla convallis rutrum a congue ultricies ridiculus, cras curabitur nulla phasellus ante ut sem rhoncus nec taciti. Vestibulum magnis lobortis primis per cursus proin tristique, mollis pretium adipiscing risus conubia vitae, curabitur et ligula himenaeos lorem malesuada.
              </p>

              <p v-if="n === 1">
                <px-buton @click="showModal = !showModal">Show Modal</px-buton>
              </p>
            </template>
        </div>
        <px-modal
          :show="showModal"
          :narrow="narrow"
          :position="position"
          :show-close-button="showCloseButton"
          :clickaway="clickaway"
          :ariaRole="ariaRole"
          @close-modal="closeModal"
        >
          <h2 slot="header">{{ header }}</h2>
          <div slot="body">
            <p v-for="n in 10">Orci rutrum proin porttitor viverra ullamcorper amet nostra, lacinia primis cras hac porta morbi consectetur ante, feugiat maecenas in platea dui suscipit. Turpis penatibus fames sociis convallis est curae, molestie parturient sed primis fermentum, facilisis cum maecenas porta posuere. Massa urna nascetur lectus hac id, in cras libero mattis habitant, senectus vivamus ut a. Parturient torquent erat libero faucibus tempor adipiscing suscipit facilisis mauris lacinia natoque, ligula nascetur neque enim fringilla convallis rutrum a congue ultricies ridiculus, cras curabitur nulla phasellus ante ut sem rhoncus nec taciti. Vestibulum magnis lobortis primis per cursus proin tristique, mollis pretium adipiscing risus conubia vitae, curabitur et ligula himenaeos lorem malesuada.</p>
          </div>
          <div slot="footer">
            {{ footer }}
          </div>
        </px-modal>
      </div>
    `,
  }
}

// export const ScrollingModalWithStickySiteHeader = () => {
//   return {
//     components: { PxModal, SiteHeader, PxButton },
//     methods: {
//       closeModal() {
//         this.showModal = false
//         action('close-modal')
//       },
//     },
//     data() {
//       return {
//         showModal: false,
//       }
//     },
//     props: {
//       header: {
//         default: text('Header Slot', 'This is the header.'),
//       },
//       footer: {
//         default: text('Footer Slot', 'This is the footer.'),
//       },
//       showCloseButton: {
//         default: boolean('Show Close Button', true),
//       },
//       narrow: {
//         default: boolean('Narrow', false),
//       },
//       position: {
//         default: select('Position', positionOptions, 'center'),
//       },
//       clickaway: {
//         default: boolean('Clickaway?', true),
//       },
//     },
//     template: `
//       <div>
//         <m-site-header />

//         <div class="container">
//           <template v-for="n in 10">
//             <p>
//               Orci rutrum proin porttitor viverra ullamcorper amet nostra, lacinia primis cras hac porta morbi consectetur ante, feugiat maecenas in platea dui suscipit. Turpis penatibus fames sociis convallis est curae, molestie parturient sed primis fermentum, facilisis cum maecenas porta posuere. Massa urna nascetur lectus hac id, in cras libero mattis habitant, senectus vivamus ut a. Parturient torquent erat libero faucibus tempor adipiscing suscipit facilisis mauris lacinia natoque, ligula nascetur neque enim fringilla convallis rutrum a congue ultricies ridiculus, cras curabitur nulla phasellus ante ut sem rhoncus nec taciti. Vestibulum magnis lobortis primis per cursus proin tristique, mollis pretium adipiscing risus conubia vitae, curabitur et ligula himenaeos lorem malesuada.
//               </p>

//               <p v-if="n === 1">
//                 <px-buton @click="showModal = !showModal">Show Modal</px-buton>
//               </p>
//             </template>
//         </div>

//         <px-modal
//           :show="showModal"
//           :narrow="narrow"
//           :position="position"
//           :show-close-button="showCloseButton"
//           :clickaway="clickaway"
//           @close-modal="closeModal"
//         >
//           <h2 slot="header">{{ header }}</h2>
//           <div slot="body">
//             <p v-for="n in 10">Orci rutrum proin porttitor viverra ullamcorper amet nostra, lacinia primis cras hac porta morbi consectetur ante, feugiat maecenas in platea dui suscipit. Turpis penatibus fames sociis convallis est curae, molestie parturient sed primis fermentum, facilisis cum maecenas porta posuere. Massa urna nascetur lectus hac id, in cras libero mattis habitant, senectus vivamus ut a. Parturient torquent erat libero faucibus tempor adipiscing suscipit facilisis mauris lacinia natoque, ligula nascetur neque enim fringilla convallis rutrum a congue ultricies ridiculus, cras curabitur nulla phasellus ante ut sem rhoncus nec taciti. Vestibulum magnis lobortis primis per cursus proin tristique, mollis pretium adipiscing risus conubia vitae, curabitur et ligula himenaeos lorem malesuada.</p>
//           </div>
//           <div slot="footer">
//             {{ footer }}
//           </div>
//         </px-modal>
//       </div>
//     `,
//   }
// }

// export const InfoModal = () => {
//   return {
//     components: { PxModal, PxButton },
//     props: {
//       body: {
//         default: text(
//           'Body Slot',
//           `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora eius temporibus ratione dignissimos, non minima quod nisi corrupti illum distinctio.`
//         ),
//       },
//       footer: {
//         default: text('Footer Slot', 'This is the footer.'),
//       },
//       showCloseButton: {
//         default: boolean('Show Close Button', false),
//       },
//       position: {
//         default: radios('Position', positionOptions, 'center'),
//       },
//       clickaway: {
//         default: boolean('Clickaway?', false),
//       },
//       ariaRole: {
//         default: select('ARIA Role', ariaRoleOptions, 'dialog'),
//       },
//     },
//     methods: {
//       closeModal() {
//         this.showModal = false
//         action('close-modal')
//       },
//     },
//     data() {
//       return {
//         showModal: true,
//       }
//     },
//     template: `
//       <div>
//         <p>
//           <px-buton @click="showModal = true">Show Modal</px-buton>
//         </p>
//         <px-modal
//           :show="showModal"
//           :position="position"
//           :show-close-button="showCloseButton"
//           :narrow="true"
//           :clickaway="clickaway"
//           :ariaRole="ariaRole"
//           @close-modal="closeModal"
//         >
//           <div class="text-center" slot="header">
//             <img
//               width="75"
//               height="75"
//               src="${ExclamationIcon}"
//               alt="exclamation mark in a circle"
//             />

//             <h2>Oh poop!</h2>
//           </div>
//           <div slot="body">
//             {{ body }}
//           </div>
//           <div slot="footer">
//             <px-buton @click="closeModal">Dismiss</px-buton>
//           </div>
//         </px-modal>
//       </div>
//     `,
//   }
// }

// export const HelpModal = () => {
//   return {
//     components: { PxModal, PxButtonHelp, PxButton },
//     props: {
//       body: {
//         default: text(
//           'Body Slot',
//           `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora eius temporibus ratione dignissimos, non minima quod nisi corrupti illum distinctio.`
//         ),
//       },
//       footer: {
//         default: text('Footer Slot', 'This is the footer.'),
//       },
//       showCloseButton: {
//         default: boolean('Show Close Button', false),
//       },
//       position: {
//         default: radios('Position', positionOptions, 'center'),
//       },
//       clickaway: {
//         default: boolean('Clickaway?', false),
//       },
//       ariaRole: {
//         default: select('ARIA Role', ariaRoleOptions, 'dialog'),
//       },
//     },
//     methods: {
//       closeModal() {
//         this.showModal = false
//         action('close-modal')
//       },
//     },
//     data() {
//       return {
//         showModal: true,
//       }
//     },
//     template: `
//       <div>
//         <p>
//           <px-buton-help
//             @click="showModal = true"
//             help-button-qa-locator="helper"
//             help-button-aria-label="Click to find out more"/>
//         </p>
//         <px-modal
//           :show="showModal"
//           :position="position"
//           :show-close-button="showCloseButton"
//           :narrow="true"
//           :clickaway="clickaway"
//           :ariaRole="ariaRole"
//           @close-modal="closeModal"
//         >
//           <div class="text-center" slot="header">
//             <img
//               width="75"
//               height="75"
//               src="${ExclamationIcon}"
//               alt="exclamation mark in a circle"
//             />

//             <h2>Oh poop!</h2>
//           </div>
//           <div slot="body">
//             {{ body }}
//           </div>
//           <div slot="footer">
//             <px-buton @click="closeModal">Dismiss</px-buton>
//           </div>
//         </px-modal>
//       </div>
//     `,
//   }
// }

// export const ModalWithCTAs = () => {
//   return {
//     components: { PxModal, PxButton },
//     props: {
//       header: {
//         default: text('Header Slot', 'This is the header.'),
//       },
//       body: {
//         default: text(
//           'Body Slot',
//           `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora eius temporibus ratione dignissimos, non minima quod nisi corrupti illum distinctio.`
//         ),
//       },
//       footer: {
//         default: text('Footer Slot', 'This is the footer.'),
//       },
//       showCloseButton: {
//         default: boolean('Show Close Button', true),
//       },
//       narrow: {
//         default: boolean('Narrow', false),
//       },
//       position: {
//         default: radios('Position', positionOptions, 'center'),
//       },
//       clickaway: {
//         default: boolean('Clickaway?', true),
//       },
//       ariaRole: {
//         default: select('ARIA Role', ariaRoleOptions, 'dialog'),
//       },
//     },
//     methods: {
//       closeModal() {
//         this.showModal = false
//         action('close-modal')
//       },
//     },
//     data() {
//       return {
//         showModal: true,
//       }
//     },
//     template: `
//       <div>
//         <p>
//           <px-buton @click="showModal = true">Show Modal</px-buton>
//         </p>
//         <px-modal
//           :show="showModal"
//           :position="position"
//           :show-close-button="showCloseButton"
//           :clickaway="clickaway"
//           :ariaRole="ariaRole"
//           @close-modal="closeModal"
//         >
//           <div class="text-center" slot="header">
//             <h2>Oh poop!</h2>
//           </div>
//           <div slot="body">
//             {{ body }}
//           </div>
//           <div slot="footer">
//           <px-buton @click="closeModal">Dismiss</px-buton>
//           </div>
//         </px-modal>
//       </div>
//     `,
//   }
// }

// ModalWithCTAs.storyName = 'Modal with CTAs'

// const Modal1 = {
//   components: { PxButton },
//   template: `
//     <div>
//       <h1>Attention!</h1>
//       <p>
//         Vivamus enim enim, pellentesque vel laoreet sit amet, blandit ut massa.
//         Quisque id gravida ante, sit amet laoreet orci. Mauris in condimentum
//         nulla. Aliquam euismod metus nisi. Fusce ac vehicula dui, tristique
//         faucibus quam. Curabitur finibus eu nisi vitae laoreet. Fusce lacus
//         felis, condimentum convallis lacinia in, porttitor ut neque. Curabitur
//         pulvinar erat vel libero ultricies, tempus convallis nibh elementum.
//         Nunc suscipit sapien a eros pretium, in vestibulum nisi ullamcorper.
//         Suspendisse sodales erat in justo accumsan tempus ac sed mi.
//       </p>
//     </div>
//   `,
// }

// const Modal2 = {
//   components: { PxButton },
//   template: `
//     <div>
//       <h1>Replace file?</h1>
//       <p>The file already exists at the chosen location. Do yuo want to replace it?</p>
//       <px-buton @click="$modal.dismiss('replace')">Yes</px-buton>
//       <px-buton @click="$modal.dismiss('replace_all')">Yes to all</px-buton>
//       <px-buton @click="$modal.dismiss('keep')">No</px-buton>
//       <px-buton @click="$modal.dismiss('keep_all')">No to all</px-buton>
//       <px-buton @click="$modal.dismiss()">Cancel</px-buton>
//     </div>
//   `,
// }

// export const PluginBasedModal = () => ({
//   components: {
//     PxButton,
//     PxPxModalContainer,
//   },
//   template: `
//     <div>
//       <px-buton @click="openModal1">Modal 1</px-buton>
//       <px-buton @click="openModal2">Modal 2</px-buton>
//       <pre>{{ messages.join('\\n') }}</pre>
//       <px-modal-container />
//     </div>
//   `,
//   data: () => ({ messages: [] }),
//   methods: {
//     addMessage(message) {
//       this.messages.push(message)
//     },
//     async openModal1() {
//       this.addMessage('Opening modal so user can see warning')

//       await this.$modal.show({
//         body: Modal1,
//       })

//       this.addMessage('We can now continue processing...')
//     },
//     async openModal2() {
//       const result = await this.$modal.show({
//         body: Modal2,
//       })

//       if (result) {
//         this.addMessage(`User chose: ${result}`)
//       } else {
//         this.addMessage('Operation cancelled')
//       }
//     },
//   },
// })
