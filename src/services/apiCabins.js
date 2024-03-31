import supabase, { supabaseUrl } from "./supabase";

//now we can use getCabin to get the data queries
export default async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  // now query supabase client, which will return in this case all of the feilds form cabins

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

// adding cabin function
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // to upload image in the bucket we also need to specify the image name and actually the path to the image in the bucket in the new cabin that we insert
  // ---------- if cabin name contains any slashes then supabase will create folders based on that
  const imageName = `${Math.random()}-${newCabin.image.name}.`.replace("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // https://wzrnooiecgoxjaslsaqo.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1 - create/edit the cabin
  let query = supabase.from("cabins");

  // A- create
  if (!id)
    query = query
      // this insert fnc right there when we create a new row in the table will not immediately return that row
      // to return that newly created object we need to attach (select and single) which will take the new element out of the array that it will be in
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single();

  // B- Edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // 2 - upload image

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    // .upload("public/avatar1.png", avatarFile, {
    //   cacheControl: "3600",
    //   upsert: false,
    // });
    .upload(imageName, newCabin.image);

  // 3 - Delete the cabin IF there was  an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
