import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";


import { auth, db } from "./firebaseConfig";

/* ---------------- FAVORITES ---------------- */

export async function getFavorites() {
  const uid = auth.currentUser.uid;

  const q = query(
    collection(db, "users", uid, "favorites"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addFavoriteVideo(title, url) {
  const uid = auth.currentUser.uid;

  const videoId = extractYouTubeID(url);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;

  await addDoc(collection(db, "users", uid, "favorites"), {
    videoId,
    title,
    url,
    thumbnail,
    createdAt: serverTimestamp(),
  });
}

export async function removeFavoriteByVideoId(videoId) {
  const uid = auth.currentUser.uid;

  const q = query(
    collection(db, "users", uid, "favorites"),
    where("videoId", "==", videoId)
  );

  const snapshot = await getDocs(q);

  snapshot.forEach(async (docSnap) => {
    await deleteDoc(doc(db, "users", uid, "favorites", docSnap.id));
  });
}
export async function toggleFavorite(video) {
  const favorites = await getFavorites();
  const exists = favorites.find((v) => v.videoId === video.videoId);

  if (exists) {
    await removeFavoriteByVideoId(video.videoId);
    return false;
  } else {
    await addFavoriteVideo(video.title, video.url);
    return true;
  }
}

export async function isFavorite(videoId) {
  const favorites = await getFavorites();
  return favorites.some((v) => v.videoId === videoId);
}
/* ---------------- LISTS ---------------- */

export async function createList(name) {
  const uid = auth.currentUser.uid;

  await addDoc(collection(db, "users", uid, "lists"), {
    name,
    createdAt: serverTimestamp(),
  });
}

export async function getUserLists() {
  const uid = auth.currentUser.uid;

  const snapshot = await getDocs(collection(db, "users", uid, "lists"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getLists() {
  return await getUserLists();
}

/* ---------------- VIDEOS IN LIST ---------------- */

export async function addVideoToList(listId, video) {
  const uid = auth.currentUser.uid;

  await addDoc(collection(db, "users", uid, "lists", listId, "videos"), {
    videoId: video.videoId,
    title: video.title,
    url: video.url,
    thumbnail: video.thumbnail,
    createdAt: serverTimestamp(),
  });
}

export async function getVideosFromList(listId) {
  const uid = auth.currentUser.uid;

  const q = query(
    collection(db, "users", uid, "lists", listId, "videos"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Añade esta función al final de tu firestore.js
export async function addFavorite(video) {
  const uid = auth.currentUser.uid;

  await addDoc(collection(db, "users", uid, "favorites"), {
    ...video,
    createdAt: serverTimestamp(),
  });
}


/* ---------------- UTILS ---------------- */

function extractYouTubeID(url) {
  return url.split("v=")[1]?.substring(0, 11) || "";
}
