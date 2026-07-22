import CommandCenterHeader from
  "../components/command-center/CommandCenterHeader";

import CommandCenterForm from
  "../components/command-center/CommandCenterForm";

import GovernanceResult from
  "../components/command-center/GovernanceResult";

import ErrorMessage from
  "../components/common/ErrorMessage";

import Loader from
  "../components/common/Loader";

import useCommandCenter from
  "../hooks/useCommandCenter";

import "../styles/CommandCenter.css"

const CommandCenterPage = () => {
  const {
    loading,
    error,
    result,
    executeCommandCenter,
    reset,
  } = useCommandCenter();

  return (
    <div className="command-center-page">
      <CommandCenterHeader />

      <CommandCenterForm
        loading={loading}
        onExecute={executeCommandCenter}
      />

      {loading && <Loader />}

      {!loading && error && (
        <ErrorMessage
          message={error}
        />
      )}

      {!loading && result && (
        <GovernanceResult
          result={result}
        />
      )}

      {!loading && result && (
        <button
          type="button"
          onClick={reset}
        >
          New Analysis
        </button>
      )}
    </div>
  );
};

export default CommandCenterPage;