import { Dispatch } from 'react';
import { create } from 'zustand';

interface cameraStoreState {
  picture: string,
  setPicture: (picture: string) => void,
}

export const useCameraStore = create<cameraStoreState>((set) => ({
  picture: '',
  setPicture: (picture) => set({picture })
}));
