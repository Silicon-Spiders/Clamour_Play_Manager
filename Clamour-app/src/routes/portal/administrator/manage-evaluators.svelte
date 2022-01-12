<script>
    import { } from "os";
    
</script>

<svelte:head>
    <title>Manage Evaluators</title>
</svelte:head>

<table style="width: 90%;">

    <th align="left">
        <h4>Evaluators</h4>
    </th>

    <td>
        <br>
        <label for="Last Name">Last Name:</label>
        <label for="First Name">First Name:</label>
        <label for="phone">Phone Number:</label>
        <label for="Email">Email:</label>

        <input type="text" id="Last Name" name="Last Name" readonly>

        <input type="text" id="First Name" name="First Name" readonly>

        <input type="tel" id="phone" name="phone" readonly>

        <input type="email" id="Email" name="Email" readonly>

    </td>
</table>

<style>

    td {
        border: 2px;
    }
</style>