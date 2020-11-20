import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaSearch, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  LoadingMoreIssues,
  Owner,
  IssueList,
  StatusIssue,
  Form,
  NotFoundIssues,
} from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},

    issues: [],
    loading: true,
    stateIssue: '',
    page: 1,
    issueNotFound: false,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const { stateIssue, page } = this.state;

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues?page=${page}`, {
        params: {
          state: !stateIssue ? 'all' : stateIssue,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
      stateIssue: '',
      issueNotFound: issues.data.length === 0,
    });
  }

  filterIssue = async (e) => {
    e.preventDefault();

    await this.setState({ page: 1 });

    const { match } = this.props;

    const { stateIssue, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: stateIssue,
        page,
      },
    });

    this.setState({
      issues: issues.data,
      stateIssue,
      page,
    });
  };

  handleInputChage = (e) => {
    this.setState({ stateIssue: e.target.value });
  };

  carregarMais = async (e) => {
    e.preventDefault();

    await this.setState((prevState) => ({
      page: prevState.page + 1,
    }));

    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const { issues, stateIssue, page } = this.state;

    const issuesList = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: !stateIssue ? 'all' : stateIssue,
        page,
      },
    });

    this.setState({
      issues: [...issues, ...issuesList.data],
    });
  };

  render() {
    const {
      repository,
      issues,
      loading,
      stateIssue,
      issueNotFound,
    } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaSpinner />
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <Form onSubmit={this.filterIssue}>
          <input
            type="text"
            placeholder="Filtrar issues (all, open ou closed)"
            onChange={this.handleInputChage}
            value={stateIssue}
          />
          <FaSearch />
        </Form>
        <IssueList>
          {issues.map((issue) => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                </strong>
                <p>{issue.user.login}</p>
              </div>
              <StatusIssue className="status-issue" status={issue.state}>
                <span>{issue.state === 'open' ? 'Open' : 'Closed'}</span>
              </StatusIssue>
            </li>
          ))}
        </IssueList>

        {issueNotFound ? (
          <NotFoundIssues>
            <div />
            <p>Oops! :(</p>
            <p>Parece que este repositório não possui issues</p>
          </NotFoundIssues>
        ) : (
          <LoadingMoreIssues>
            <div onClick={this.carregarMais}>
              <span>Loading more.</span>
            </div>
          </LoadingMoreIssues>
        )}
      </Container>
    );
  }
}
