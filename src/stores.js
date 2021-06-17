import { writable } from 'svelte/store'

import * as vis from 'vis-network/standalone/esm/vis-network'

export const activeNodeID = writable()

export const network = writable()
export const networkData = writable({ nodes: new vis.DataSet([]), edges: new vis.DataSet([]) })
