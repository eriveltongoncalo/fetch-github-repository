import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List, Input } from './styles';
import Warning from '../../components/Warning/warning';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    repoNotFound: false,
  };

  // Carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar os dados do localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = (e) => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    try {
      if (repositories.find((repo) => repo.name === newRepo.trim())) {
        throw new Error('Repositório duplicado.');
      }

      const response = await api.get(`/repos/${newRepo.trim()}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
        repoNotFound: false,
      });
    } catch (error) {
      this.setState({
        newRepo: '',
        loading: false,
        repoNotFound: true,
      });
    }
  };

  render() {
    const { newRepo, loading, repositories, repoNotFound } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositories
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <div>
            <Input
              repoNotFound={repoNotFound}
              type="text"
              placeholder="Add repositories"
              value={newRepo}
              onChange={this.handleInputChange}
            />

            <SubmitButton loading={loading}>
              {loading ? (
                <FaSpinner color="#FFF" size={14} />
              ) : (
                <FaPlus color="#FFF" size={14} />
              )}
            </SubmitButton>
          </div>

          <Warning
            show={repoNotFound}
            msg="Repository not found."
            fontColor="#d93025"
          />
        </Form>

        <List>
          {repositories.map((repository) => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Details
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
