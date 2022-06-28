import { ref } from "vue";

/** Custom hook used to help handle common open, close, or toggle scenarios */
function useDisclosure(defaultIsOpen = false) {
    const isOpen = ref(defaultIsOpen)

    const onOpen = () => isOpen.value = true
    const onClose = () => isOpen.value = false
    const onToggle = () => isOpen.value = !isOpen.value

    return { isOpen, onOpen, onClose, onToggle }
}

export default useDisclosure
