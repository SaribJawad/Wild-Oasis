import supabase, { supabase2, supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase2.auth.signUp({
    email,
    password,
    options: {
      data: {
        // can pass anykind of information about the user
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  // on supabase client we can use AUTH sub module so we can call all kind of methods (--- most basic is the signInWithPassword)
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

// user might want to access this page a bit later not only after they have logged in, in real world web even if u logged in a day ago and refresh the page you will still want to be logged in not only immediately after you do that login process.
// so each time user reload page, then that user need to be refetched from the supabase API (then we can check if they exist and are they still authenticated)

export async function getCurrentUser() {
  // checking the current active session (this data will come from the local Storage )
  const { data: session } = await supabase.auth.getSession();
  console.log(session);
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1- update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2- upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3- update avatar in the user

  const { data: updatedUser, error: error2 } = supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error.message);

  return updatedUser;
}
