export type LibraryState = {
  libraryState: { recent: boolean; bookmark: boolean };
  setLibraryState: ({ recent: boolean, bookmark: boolean }) => void;
};
