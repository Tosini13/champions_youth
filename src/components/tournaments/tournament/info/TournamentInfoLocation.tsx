import React from "react";
import { ALink } from "../../../../styled/styledComponents/styledTypography";

export interface TournamentInfoLocationProps {
  city?: string;
  address?: string;
}

const TournamentInfoLocation: React.FC<TournamentInfoLocationProps> = ({
  city,
  address,
}) => {
  if (!address?.localeCompare("") && !city?.localeCompare("")) {
    return null;
  }

  if (!address?.localeCompare("") && city?.localeCompare("")) {
    return (
      <ALink
        href={`https://www.google.com/maps/search/?api=1&query=${city
          .split(" ")
          .join("+")}`}
        target="_blank"
      >
        {city}
      </ALink>
    );
  }

  if (address?.localeCompare("") && !city?.localeCompare("")) {
    return (
      <ALink
        href={`https://www.google.com/maps/search/?api=1&query=${address
          .split(" ")
          .join("+")}`}
        target="_blank"
      >
        {address}
      </ALink>
    );
  }

  return (
    <ALink
      href={`https://www.google.com/maps/search/?api=1&query=${address
        ?.split(" ")
        .join("+")}+${city?.split(" ").join("+")}`}
      target="_blank"
    >
      {address}, {city}
    </ALink>
  );
};

export default TournamentInfoLocation;
