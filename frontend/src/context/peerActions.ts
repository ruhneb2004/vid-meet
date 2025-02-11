export const ADD_PEER = "ADD_PEER" as const;
export const REMOVE_PEER = "REMOVE_PEER" as const;

export const addPeer = (peerId: string, stream: MediaStream) => ({
  type: ADD_PEER,
  payload: { peerId, stream },
});

export const removePeer = (peerId: string) => ({
  type: REMOVE_PEER,
  payload: { peerId },
});
