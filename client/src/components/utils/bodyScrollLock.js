export const disableBodyScroll = () => {
    document.body.classList.add('overflow-hidden');
  };
  
  export const enableBodyScroll = () => {
    document.body.classList.remove('overflow-hidden');
  };