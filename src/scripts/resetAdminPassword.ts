import { auth } from "../config/firebaseConfig";

async function resetAdminPassword() {
  const uid = "LOnZFf9ltKTpgjlIyuYYNPZvlCB3";

  await auth.updateUser(uid, {
    password: "password123",
  });

  console.log("Password updated successfully");
}

resetAdminPassword().catch(console.error);