import React from "react";
import { shallow, mount } from "enzyme";
import CreateRuleModal from ".";
import ConfirmationModal from "../../../shared/ConfirmationModal";
import { Selectors, WriteSelectors } from "../../selectors";

describe("Create Rule Modal", () => {
  let props;
  let mountedCreateRuleModal;
  const {
    priority,
    bounceAction,
    responseCode,
    description,
    enhancedCode,
    regex,
    cancelCreateRuleButton,
    submitButton,
  } = Selectors;
  const CreateRuleModalComponent = () => {
    if (!mountedCreateRuleModal) {
      mountedCreateRuleModal = shallow(<CreateRuleModal {...props} />);
    }
    return mountedCreateRuleModal;
  };

  beforeEach(() => {
    props = {
      handleRuleUpdate: () => {},
      handleCreateSubmit: () => {},
      handleDropdownSelect: () => {},
      newRule: {},
      isInvalidInput: false,
      handleModalClose: () => {},
      handleRuleUpdateInt: () => {},
    };
    mountedCreateRuleModal = undefined;
  });

  describe("When a user opens the Create Rule Modal", () => {
    it("should render a priority field", () => {
      expect(CreateRuleModalComponent().find(priority)).toHaveLength(1);
    });
    it("should render a bounce action field", () => {
      expect(CreateRuleModalComponent().find(bounceAction)).toHaveLength(1);
    });
    it("should render a response code field", () => {
      expect(CreateRuleModalComponent().find(responseCode)).toHaveLength(1);
    });
    it("should render a description field", () => {
      expect(CreateRuleModalComponent().find(description)).toHaveLength(1);
    });
    it("should render a enhance code field", () => {
      expect(CreateRuleModalComponent().find(enhancedCode)).toHaveLength(1);
    });
    it("should render a regex field", () => {
      expect(CreateRuleModalComponent().find(regex)).toHaveLength(1);
    });
    it("should render a cancel button", () => {
      expect(
        CreateRuleModalComponent().find(cancelCreateRuleButton)
      ).toHaveLength(1);
    });
    it("should render a  button", () => {
      expect(CreateRuleModalComponent().find(submitButton)).toHaveLength(1);
    });
  });

  describe("When a user attempts to create a rule", () => {
    it("should alert if field is left empty", () => {
      CreateRuleModalComponent().setProps({
        fieldValidation: { description: "Invaid Description" },
      });
      expect(
        CreateRuleModalComponent()
          .find(description)
          .prop("isValid")
      ).toBeFalsy();
    });
  });
});

describe("Create Rule Confirmation", () => {
  let props;
  let mountedConfirmationModal;
  const { confirmSubmit, commitInput } = Selectors;
  const ConfirmationComponent = () => {
    if (!mountedConfirmationModal) {
      mountedConfirmationModal = mount(
        <ConfirmationModal {...props} selectors={WriteSelectors} />
      );
    }
    return mountedConfirmationModal;
  };

  beforeEach(() => {
    props = {
      selectedRule: {},
      toggleId: 0,
      handleModalClose: () => {},
      handleConfirm: () => {},
      isUpdateError: false,
      isCommitValid: true,
      handleOnChange: () => {},
    };
    mountedConfirmationModal = undefined;
  });

  describe("When a user is presented with a confirmation modal", () => {
    it("should render a commit field", () => {
      expect(
        ConfirmationComponent()
          .find(commitInput)
          .exists()
      ).toBeTruthy();
    });

    it("should render a disabled confirm button if commit is empty", () => {
      expect(
        ConfirmationComponent()
          .find(confirmSubmit)
          .first()
          .prop("disabled")
      ).toBeTruthy();
    });

    it("should render an enabled confirm button if commit is not empty", () => {
      expect(
        ConfirmationComponent()
          .setProps({
            selectedRule: { comment: "a commit message" },
            isCommitValid: true,
          })
          .find(confirmSubmit)
          .first()
          .prop("disabled")
      ).toBeFalsy();
    });
  });
});
