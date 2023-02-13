import { Edit, NumberInput, SimpleForm, TextInput } from "react-admin";

export default function ShopsEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="name" fullWidth />
        <TextInput source="brand" fullWidth />
        <TextInput source="type" fullWidth />
        <TextInput source="address" fullWidth />
        <TextInput source="website" fullWidth />
        <TextInput source="email" fullWidth />
        <TextInput source="phone" fullWidth />
        <TextInput source="fb_page" fullWidth />
        <TextInput source="insta_page" fullWidth />
        <NumberInput source="x" fullWidth />
        <NumberInput source="y" fullWidth />
        <TextInput source="img_url" fullWidth />
      </SimpleForm>
    </Edit>
  );
}
