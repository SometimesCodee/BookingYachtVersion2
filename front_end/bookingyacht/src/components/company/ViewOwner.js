import React from 'react';

const ViewOwner = () => {
    return (
        <div>
            <h2>List Owner</h2>
            <div
                class="table-responsive"
            >
                <table
                    class="table table-striped table-hover table-bordered table-primary align-middle"
                >
                    <thead class="table-light">


                        <tr>
                            <th>Column 1</th>
                            <th>Column 2</th>
                            <th>Column 3</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr
                            class="table-primary"
                        >
                            <td scope="row">Item</td>
                            <td>Item</td>
                            <td>Item</td>
                        </tr>
                        <tr
                            class="table-primary"
                        >
                            <td scope="row">Item</td>
                            <td>Item</td>
                            <td>Item</td>
                        </tr>
                    </tbody>
                    <tfoot>

                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default ViewOwner;