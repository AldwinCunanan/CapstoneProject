import { auth } from "../../config/firebaseConfig";

async function setFirstAdmin() {
  try {
    const adminUid = "LOnZFf9ltKTpgjlIyuYYNPZvlCB3";

    await auth.setCustomUserClaims(adminUid, { role: "admin" });

    console.log("Admin role assigned successfully!");
  } catch (error) {
    console.error("Error assigning admin role:", error);
  }
}

setFirstAdmin();