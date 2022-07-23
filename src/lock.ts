let lock = false;

const setLock = (locked: boolean) => {
  lock = locked;
};

const isLocked = () => lock;

export { isLocked, setLock };
