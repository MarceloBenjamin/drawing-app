import { atom } from 'recoil'

export const pathsAtom = atom({
	key: 'paths',
	default: [],
})

export const tempPathsAtom = atom({
	key: 'tempPaths',
	default: [],
})