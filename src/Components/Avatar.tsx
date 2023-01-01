import { useContext, useEffect, useState } from "react";
import { delay, Observable } from "rxjs";
import { DispatchContext } from "../Context";
import { fetchUserImage } from "../Services";
import { setCachedAvatarAction } from "../State";
import { Client } from "../Types";
import { getInitials } from "../Utils";

type PartialProps = {
  isScrolling$: Observable<boolean>;
  index: number;
};

type ClientProps = Pick<
  Client,
  "first_name" | "last_name" | "avatar" | "cachedAvatar" | "id"
>;

type Props = PartialProps & ClientProps;

const getUserImage = (dispatch: CallableFunction, url: string, id: number) =>
  fetchUserImage(url)
    .then(({ data }) => dispatch(setCachedAvatarAction(data, id)))
    .catch((e) => {
      // silent error
    });

export const Avatar = ({
  first_name,
  last_name,
  avatar,
  cachedAvatar,
  id,
  isScrolling$,
  index,
}: Props) => {
  const dispatch = useContext(DispatchContext);
  const [profileImage, setProfileImage] = useState<string>();
  const [initials] = useState(() => getInitials(first_name, last_name));

  useEffect(() => {
    const sub = isScrolling$
      .pipe(
        // add gentle delay to de-bulk loading and animations
        delay((index % 15) * 10)
      )
      .subscribe(() => {
        avatar && !cachedAvatar && getUserImage(dispatch, avatar, id);
      });

    return () => {
      sub.unsubscribe();
    };
  }, [
    isScrolling$,
    dispatch,
    avatar,
    id,
    setProfileImage,
    cachedAvatar,
    index,
  ]);

  useEffect(() => {
    if (cachedAvatar) {
      let reader = new window.FileReader();
      reader.readAsDataURL(cachedAvatar);
      reader.onload = function () {
        let imageDataUrl = reader.result as string;
        setProfileImage(imageDataUrl);
      };
    }
  }, [cachedAvatar, avatar, dispatch]);

  return (
    <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {!profileImage && initials}

        {profileImage && (
          <img
            className="w-24 h-24 rounded-full fade-in"
            src={profileImage}
            alt="profileImage"
            width="384"
            height="512"
          />
        )}
      </span>
    </div>
  );
};
