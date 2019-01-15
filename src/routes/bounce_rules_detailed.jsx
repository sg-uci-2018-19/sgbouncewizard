import React from "react";
import _ from "underscore";
import { Redirect } from "react-router-dom";

import BounceRuleDetailed from "../components/BounceRuleDetailed";
import { getRule, getChangelog, putRule } from "../utils/ruleCalls";

export default class BounceRuleDetailedPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRule: null,
      changelog: [],
      isEditClicked: false,
      isChangeModalOpen: false,
      isCancelConfirmOpen: false,
      isConfirmOpen: false,
      isUpdateError: false,
      currentPageIndex: 1,
      rulesToShow: 10,
      pagesToDisplay: 5,
      isNetworkError: false,
      changelogLimit: 10,
    };
    this.logout = this.logout.bind(this);
    this.onChangeRule = this.onChangeRule.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleEditClicked = this.handleEditClicked.bind(this);
    this.handleCancelSaveClicked = this.handleCancelSaveClicked.bind(this);
    this.handleChangelogClicked = this.handleChangelogClicked.bind(this);
    this.handleCancelConfirmation = this.handleCancelConfirmation.bind(this);
    this.handleSaveConfirmation = this.handleSaveConfirmation.bind(this);
    this.onChangeRuleInt = this.onChangeRuleInt.bind(this);
    this.updatePageIndex = this.updatePageIndex.bind(this);
    this.handlePrevClicked = this.handlePrevClicked.bind(this);
    this.handleNextClicked = this.handleNextClicked.bind(this);
  }

  async componentDidMount() {
    const { match } = this.props;
    getChangelog(match.params.bounceRuleId)
      .then(res => {
        const { data } = res;
        this.setState({
          changelog: data,
        });
      })
      .catch(() => {
        this.setState({ isNetworkError: true });
      });
    const { data, status } = await getRule(match.params.bounceRuleId);
    if (status === 200) {
      this.setState({
        currentRule: data,
      });
    }
  }

  onChangeRule(e) {
    const { id, value } = e.currentTarget;
    const { updatedRule } = this.state;
    this.setState({
      updatedRule: { ...updatedRule, [id]: value },
    });
  }

  onChangeRuleInt(e) {
    const { updatedRule } = this.state;
    const { id, value } = e.currentTarget;
    if (!value) {
      this.setState({
        updatedRule: { ...updatedRule, [id]: value },
      });
    } else {
      this.setState({
        updatedRule: { ...updatedRule, [id]: parseInt(value, 10) },
      });
    }
  }

  logout() {
    const { history } = this.props;
    localStorage.clear();
    history.push("/");
  }

  handleModalClose(e) {
    const { id } = e.currentTarget;
    this.setState({
      [id]: false,
    });
  }

  handleChangelogClicked(e) {
    const { changelog } = this.state;
    const changeIndex = e.currentTarget.getAttribute("index");
    this.setState({
      selectedChange: changelog[changeIndex],
      isChangeModalOpen: true,
    });
  }

  handleEditClicked(e) {
    const { id } = e.currentTarget;
    const { currentRule } = this.state;
    this.setState({
      [id]: true,
      updatedRule: _.omit(currentRule, ["created_at", "comment", "user_id"]),
    });
  }

  handleCancelSaveClicked(e) {
    const { id } = e.currentTarget;
    const { currentRule, updatedRule } = this.state;
    if (
      !_.isEqual(
        updatedRule,
        _.omit(currentRule, ["created_at", "comment", "user_id"])
      )
    ) {
      this.setState({
        [id]: true,
      });
    } else {
      this.setState({
        isEditClicked: false,
      });
    }
  }

  handleCancelConfirmation() {
    this.setState({
      isCancelConfirmOpen: false,
      isEditClicked: false,
    });
  }

  async handleSaveConfirmation() {
    const { updatedRule } = this.state;
    updatedRule.user_id = parseInt(localStorage.getItem("user_id"), 10);
    const { id } = updatedRule;
    await putRule(id, updatedRule)
      .then(() => {
        this.setState({
          isConfirmOpen: false,
          isEditClicked: false,
        });
      })
      .catch(() => {
        this.setState({
          isUpdateError: true,
        });
      });
    getChangelog(id).then(res => {
      const { data } = res;
      this.setState({
        currentRule: updatedRule,
        changelog: data,
      });
    });
  }

  paginate(changelog) {
    const { currentPageIndex, rulesToShow } = this.state;
    const ruleStartIndex = (currentPageIndex - 1) * rulesToShow;
    const ruleEndIndex =
      (currentPageIndex - 1 * currentPageIndex + rulesToShow) *
      currentPageIndex;
    return changelog.slice(ruleStartIndex, ruleEndIndex);
  }

  updatePageIndex(e) {
    const newIndex = parseInt(e.currentTarget.getAttribute("value"), 10);
    this.setState(prevState => {
      const isPageIndexUpdated = prevState.currentPageIndex !== newIndex;
      return {
        currentPageIndex: isPageIndexUpdated
          ? newIndex
          : prevState.currentPageIndex,
      };
    });
  }

  handlePrevClicked() {
    this.setState(prevState => ({
      currentPageIndex: prevState.currentPageIndex - 1,
    }));
  }

  handleNextClicked() {
    this.setState(prevState => ({
      currentPageIndex: prevState.currentPageIndex + 1,
    }));
  }

  render() {
    const { currentRule, changelog } = this.state;
    const filteredChangelog = this.paginate(changelog);
    const isAuthenticated = localStorage.getItem("isAuth");
    return (
      <React.Fragment>
        {!isAuthenticated && (
          <Redirect
            push
            to={{
              pathname: `/`,
            }}
          />
        )}
        {isAuthenticated &&
          currentRule && (
            <BounceRuleDetailed
              logout={this.logout}
              handleModalClose={this.handleModalClose}
              handleButtonClicked={this.handleButtonClicked}
              onChangeRule={this.onChangeRule}
              handleEditClicked={this.handleEditClicked}
              handleCancelSaveClicked={this.handleCancelSaveClicked}
              handleChangelogClicked={this.handleChangelogClicked}
              handleCancelConfirmation={this.handleCancelConfirmation}
              handleSaveConfirmation={this.handleSaveConfirmation}
              handlePrevClicked={this.handlePrevClicked}
              handleNextClicked={this.handleNextClicked}
              onChangeRuleInt={this.onChangeRuleInt}
              updatePageIndex={this.updatePageIndex}
              filteredChangelog={filteredChangelog}
              {...this.state}
            />
          )}
      </React.Fragment>
    );
  }
}
