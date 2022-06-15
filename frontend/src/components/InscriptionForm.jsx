/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import axios from "axios";

export default function InscriptionForm() {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm();

  const { isSubmitting, isSubmitSuccessful } = formState;

  const onSubmit = async (data) => {
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users`,
        data
      );
      console.warn(resp.data);
    } catch (err) {
      console.warn(err.data);
    }
  };

  return (
    <div className="grid place-items-center h-screen bg-white">
      <h2 className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2">
        Incription
      </h2>
      {isSubmitSuccessful && (
        <div className="alert alert-success">
          Votre inscription a été prise en compte
        </div>
      )}
      <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-firstName"
            >
              Prénom
              <input
                type="text"
                placeholder="Jane"
                {...register("firstName", {
                  required: true,
                  minLength: 2,
                  maxLength: 50,
                  pattern: /^([ \u00c0-\u01ffa-zA-Z'-])+$/i,
                })}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-firstName"
              />
              {errors?.firstName?.type === "required" && (
                <p className="text-red-600 normal-case text-xs font-normal italic">
                  Ce champ est requis.
                </p>
              )}
              {errors?.firstName?.type === "minLength" && (
                <p className="text-red-600 normal-case text-xs font-normal italic">
                  Votre prénom ne peut pas faire moins de 2 caractères.
                </p>
              )}
              {errors?.firstName?.type === "maxLength" && (
                <p className="text-red-600 normal-case text-xs font-normal italic">
                  Votre prénom ne peut pas exceder 50 caractères.
                </p>
              )}
              {errors?.firstName?.type === "pattern" && (
                <p className="text-red-600 normal-case text-xs font-normal italic">
                  Ce champ n'accèpte pas la saisie de caractères spéciaux.
                </p>
              )}
            </label>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-lastName"
            >
              Nom
              <input
                type="text"
                placeholder="Doe"
                {...register("lastName", {
                  required: true,
                  minLength: 2,
                  maxLength: 50,
                  pattern: /^([ \u00c0-\u01ffa-zA-Z'-])+$/i,
                })}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-lastName"
              />
              {errors?.lastName?.type === "required" && (
                <p className="text-red-600 normal-case text-xs font-normal italic">
                  Ce champ est requis.
                </p>
              )}
              {errors?.lastName?.type === "minLength" && (
                <p className="text-red-600 normal-case text-xs font-normal italic">
                  Votre prénom ne peut pas faire moins de 2 caractères.
                </p>
              )}
              {errors?.lastName?.type === "maxLength" && (
                <p className="text-red-600 normal-case text-xs font-normal italic">
                  Votre prénom ne peut pas exceder 50 caractères.
                </p>
              )}
              {errors?.lastName?.type === "pattern" && (
                <p className="text-red-600 normal-case text-xs font-normal italic">
                  Ce champ n'accèpte pas la saisie de caractères spéciaux.
                </p>
              )}
            </label>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-birthDate"
            >
              Date de naissance
              <input
                type="text"
                placeholder="01/01/2000"
                {...register("birthDate", {
                  require: true,
                  pattern:
                    /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
                })}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-birthDate"
              />
              {errors?.birthDate?.type === "required" && (
                <p className="text-red-600 normal-case text-xs font-normal italic">
                  Ce champ est requis.
                </p>
              )}
              {errors?.birthDate?.type === "pattern" && (
                <p className="text-red-600 normal-case text-xs font-normal italic">
                  Merci de respecter le format suivant : "jj/mm/aaaa".
                </p>
              )}
            </label>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-gender"
            >
              Genre
              <div className="relative">
                <select
                  name="gender"
                  {...register("gender", { required: true })}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="female">Femme</option>
                  <option value="male">Homme</option>
                  <option value="non-binary">Non-binaire</option>
                  <option value="other">Autre</option>
                  <option value="not-tell">Ne se prononce pas</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {errors?.gender?.type === "required" && (
                <p className="text-red-600 normal-case text-xs font-normal italic">
                  Ce champ est requis.
                </p>
              )}
            </label>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              htmlFor="grid-city"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Ville
              <input
                type="text"
                placeholder="Paris"
                {...register("city", {
                  required: false,
                  minLength: 3,
                  maxLength: 80,
                  pattern: /^([ \u00c0-\u01ffa-zA-Z'-])+$/i,
                })}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              {errors?.city?.type === "minLength" && (
                <p className="text-red-600 normal-case text-xs font-normal italic">
                  Le nom de votre ville ne peut pas faire moins de 3 caractères.
                </p>
              )}
              {errors?.city?.type === "maxLength" && (
                <p className="text-red-600 normal-case text-xs font-normal italic">
                  Le nom de votre ville ne peut pas exceder 80 caractères.
                </p>
              )}
              {errors?.city?.type === "pattern" && (
                <p className="text-red-600 normal-case text-xs font-normal italic">
                  Ce champs n'accepte pas les caractères spéciaux.
                </p>
              )}
            </label>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              htmlFor="grid-zipcode"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Code postal
              <input
                type="text"
                placeholder="75020"
                {...register("zipcode", {
                  required: false,
                  minLength: 4,
                  maxLength: 8,
                  pattern: /^[0-9]{3,}$/,
                })}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              {errors?.zipcode?.type === "minLength" && (
                <p className="text-red-600 normal-case text-xs font-normal italic">
                  Votre code postal ne peut pas faire moins de 4 caractères.
                </p>
              )}
              {errors?.zipcode?.type === "maxLength" && (
                <p className="text-red-600 normal-case text-xs font-normal italic">
                  Votre code postal ne peut pas faire plus de 8 caractères.
                </p>
              )}
              {errors?.zipcode?.type === "pattern" && (
                <p className="text-red-600 normal-case text-xs font-normal italic">
                  Ce champs n'accepte pas les caractères spéciaux.
                </p>
              )}
            </label>
          </div>
        </div>
        <label
          htmlFor="email"
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Email
          <input
            type="text"
            placeholder="jane.doe@gmail.com"
            {...register("email", {
              required: true,
              minLength: 10,
              maxLength: 100,
              pattern: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}/i,
            })}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
          {errors?.email?.type === "required" && (
            <p className="text-red-600 normal-case text-xs font-normal italic">
              Ce champ est requis.
            </p>
          )}
          {errors?.email?.type === "minLength" && (
            <p className="text-red-600 normal-case text-xs font-normal italic">
              Votre adresse mail est trop courte.
            </p>
          )}
          {errors?.email?.type === "maxLength" && (
            <p className="text-red-600 normal-case text-xs font-normal italic">
              Votre adresse mail est trop longue.
            </p>
          )}
          {errors?.email?.type === "pattern" && (
            <p className="text-red-600 normal-case text-xs font-normal italic">
              Votre adresse mail n'est pas valide.
            </p>
          )}
        </label>
        <label
          htmlFor="password"
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Mot de passe
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 100,
              pattern:
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            })}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
          {errors?.password?.type === "required" && (
            <p className="text-red-600 normal-case text-xs font-normal italic">
              Ce champ est requis.
            </p>
          )}
          {errors?.password?.type === "minLength" && (
            <p className="text-red-600 normal-case text-xs font-normal italic">
              Votre mot de passe est trop court.
            </p>
          )}
          {errors?.password?.type === "maxLength" && (
            <p className="text-red-600 normal-case text-xs font-normal italic">
              Votre mot de passe est trop long.
            </p>
          )}
          {errors?.password?.type === "pattern" && (
            <p className="text-red-600 normal-case text-xs font-normal italic">
              Votre mot de passe doit au moins comporter une lettre en
              majuscule, une en minuscule, un chiffre et un caractère spécial.
            </p>
          )}
        </label>
        <input type="submit" disabled={isSubmitting} />
      </form>
    </div>
  );
}
