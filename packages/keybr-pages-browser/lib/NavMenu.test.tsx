import { test } from "node:test";
import { FakeIntlProvider } from "@keybr/intl";
import { PageDataContext } from "@keybr/pages-shared";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { isNotNull, isNull } from "rich-assert";
import { NavMenu } from "./NavMenu.tsx";

test("render", () => {
  const r = render(
    <PageDataContext.Provider
      value={{
        base: "https://www.keybr.com/",
        locale: "en",
        user: null,
        publicUser: {
          id: null,
          name: "userName",
          imageUrl: null,
        },
        settings: null,
      }}
    >
      <FakeIntlProvider>
        <MemoryRouter>
          <NavMenu />
        </MemoryRouter>
      </FakeIntlProvider>
    </PageDataContext.Provider>,
  );

  isNotNull(r.queryByText("Practice"));
  isNotNull(r.queryByText("Profile"));
  isNotNull(r.queryByText("Typing Test"));
  isNull(r.queryByText("Layouts"));
  isNull(r.queryByText("userName"));

  r.unmount();
});
