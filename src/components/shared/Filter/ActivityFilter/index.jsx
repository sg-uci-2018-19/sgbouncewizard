import React from "react";
import { Button } from "@sendgrid/ui-components/button";
import { TextInput } from "@sendgrid/ui-components/text-input";
import { Select } from "@sendgrid/ui-components/select";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
// import "react-dates/lib/css/_datepicker.css";
import { Row } from "../../Row";
import { Column } from "../../Column";
import "./index.scss";

const selectOptions = filterBy => {
  if (filterBy === "bounce_action") {
    return [
      { label: "no_action", value: "no_action" },
      { label: "retry", value: "retry" },
      { label: "suppress", value: "suppress" },
      { label: "blocked", value: "blocked" },
    ];
  }
  if (filterBy === "operation") {
    return [
      { label: "Create", value: "create" },
      { label: "Update", value: "update" },
      { label: "Delete", value: "delete" },
    ];
  }
  return null;
};

const RuleFilter = ({
  filterQuery,
  updateFilterBy,
  updateFilterOption,
  isValidFilter,
  handleClearSearch,
  handleOptionSelector,
  onDateChange,
  onFocusChange,
  startDate,
  endDate,
  focusedInput,
}) => {
  const { filterBy, option } = filterQuery || {};
  const isDropdown = filterBy === "bounce_action" || filterBy === "operation";
  const isDatePicker = filterBy === "created_at";
  return (
    <div className="filter-wrap">
      <div className="filter-header">
        <p className="filter-title">
          {"Search bounce rules by "}
          <a className="filter-option-toggle" href="#">
            all
          </a>
          {" of the following:"}
        </p>
        <div className="btn-list">
          <Button type="secondary" onClick={handleClearSearch} small>
            Clear Search
          </Button>
        </div>
      </div>
      <div className="filter-list">
        <Row>
          <Column width={3} offset={1}>
            <Select
              className="select-filter"
              onChange={updateFilterBy}
              name="primary-filter"
              defaultValue={{ label: "Operation", value: "operation" }}
              options={[
                { label: "Operation", value: "operation" },
                { label: "Bounce Action", value: "bounce_action" },
                { label: "Enhanced Code", value: "enhanced_code" },
                { label: "Description", value: "description" },
                { label: "Comment", value: "comment" },
                { label: "Priority", value: "priority" },
                { label: "Response Code", value: "response_code" },
                { label: "Created At", value: "created_at" },
              ]}
            />
          </Column>
          <Column className="filter-column" width={9} offset={4}>
            {isDropdown && (
              <div className="filter-select">
                <Select
                  isRequired
                  onChange={handleOptionSelector}
                  placeholder="Select an Option"
                  value={
                    option && { label: option, value: option.toLowerCase() }
                  }
                  options={selectOptions(filterBy)}
                />
              </div>
            )}
            {isDatePicker && (
              <div className="sg-date-picker">
                <DateRangePicker
                  small
                  startDate={startDate}
                  startDateId="startDate"
                  endDate={endDate}
                  endDateId="endDate"
                  onDatesChange={onDateChange}
                  focusedInput={focusedInput}
                  onFocusChange={onFocusChange}
                  // isOutsideRange allows for selection of past dates (default action is to disable selction of past dates)
                  isOutsideRange={() => false}
                />
              </div>
            )}
            {!isDropdown &&
              !isDatePicker && (
                <TextInput
                  type="text"
                  fullWidth
                  onChange={updateFilterOption}
                  value={option}
                  isValid={isValidFilter}
                  info={
                    !isValidFilter && "Please enter a valid filter description."
                  }
                />
              )}
          </Column>
          <i className="filter-row-remove sg-icon sg-icon-x" />
        </Row>
      </div>
    </div>
  );
};
export default RuleFilter;
