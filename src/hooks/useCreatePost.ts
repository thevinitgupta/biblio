import { loggingService } from "@/app/actions/logging";
import { ResponseType, LoggerLevel } from "@/types/enums";

import {
  CreatePostData,
  CreatePostSchema,
  LoginFormData,
  LoginFormSchema,
  SignupFormData,
  SignupFormSchema,
} from "@/types/forms";
import {
  authClient,
  axios,
  openDataClient,
  privateAccessClient,
  publicClient,
} from "@/utils/axiosUtil";

import useGlobalStore from "@/utils/zustand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

function getCookieValue(cookieName: string) {
  const name = cookieName + "=";
  console.log("Document for Cookie :" + document, document?.cookie);
  const decodedCookie = decodeURIComponent(document?.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

// Get the CSRF token from the cookie (default name might be "XSRF-TOKEN")

const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { sessionToken } = useGlobalStore();
  return useMutation({
    mutationKey: ["create-post"],
    mutationFn: async (values: any) => {
      const token = sessionToken || queryClient.getQueryData(["access-token"]);
      // console.log("TOKEN CREATE POST :", token)

      console.log(
        "CREATE POST DATA : " + values.coverImage,
        values.title,
        values.content,
        values.taggedBook
      );
      const createPostData = values as CreatePostData;

      //console.log("Create Post Data : ",createPostData);

      CreatePostSchema.parse({
        title: createPostData.title,
        content: createPostData.content,
        taggedBook: createPostData.taggedBook,
        coverImage: createPostData.coverImage,
      });

      createPostData.taggedBook.bookId = createPostData.taggedBook.id!;
      createPostData.taggedBook.id = null;

      const headers = {
        Authorization: `Basic ${token?.trim()}`,
      };

      console.log("Create Post headers : ", headers);
      try {
        // console.log("Create Post body BASE64 : ",JSON.stringify(createPostData));
        const base64Encoded = Buffer.from(
          JSON.stringify(createPostData),
          "utf-8"
        ).toString("base64");
        console.log("Create Post body BASE64 : ", base64Encoded);

        const createPostResponse: AxiosResponse = await openDataClient.post(
          "/posts/create",
          base64Encoded,
          {
            headers: headers,
          }
        );
        console.log("Create Post Response : ", createPostResponse);
        const createPostResponseData = createPostResponse.data;

        const createPostResponseMessage: string =
          (createPostResponseData as string) || "";

        return {
          message: createPostResponseMessage,
          type: ResponseType.success,
        };
      } catch (error) {
        console.log("BASE 64 ERROR : ", error);
      }
    },
  });
};

export default useCreatePost;
